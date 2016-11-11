'use strict';

const atob = require('atob');
const bcrypt = require('bcrypt');
const uuid = require('uuid');

const userModel = require('../models/users.js');

const saltRounds = 10;

exports.login = function* (next) {
  try {
    // sample: cnViZW46MTIzNA==
    let auth = this.request.header.authorization.split(' ')[1];
    auth = atob(auth).split(':');

    let userInfo = yield new Promise(function(resolve,reject) {
      try {
        let query = userModel.getUserHash(auth[0]);
        resolve(query);
      } catch (err) {
        reject(err);
      }
    });
    let passOK = yield new Promise(function(resolve,reject) {
      bcrypt.compare(auth[1], userInfo.hashedPass, function (err, res) {
        if (err) {
          console.log('Error while checking password');
          resolve(false);
        }
        else if (res) {
          resolve(true);
        } else {
          resolve(false);
        }
      });
    });
    if (passOK) {
      console.log(userInfo.idToken);
      if (userInfo.idToken && userInfo.idToken !== null && userInfo.idToken !=='') {
        this.status = 200;
        this.body = {
          status: 'Authorized',
          idToken: userInfo.idToken
        };
      } else {
        let newToken = uuid.v4();
        let changeTokenOK = yield new Promise(function(resolve,reject) {
          try {
            let res = userModel.changeUserToken(auth[0],newToken);
            resolve(res);
          } catch (err) {
            reject(err);
          }
        });
        if (res) {
          this.status = 200;
          this.body = {
            status: 'Authorized',
            idToken: newToken
          };
        }
      }
    } else {
      this.status = 401;
      this.body = {
        status: 'Unauthorized'
      }
    }
  } catch (err) {
    this.status = 500;
    this.body = err;
  }
};

// exports.createUser = function* (next) {
//   let user = yield new Promise(function(resolve,reject) {
//     try {
//       userModel.createUser({
//         username: 'ruben',
//         hashedPass: 'asdfasdfasdfasdfas',
//         clearance: 'admin'
//       });
//       resolve('done!');
//     } catch (err) {
//       reject(err);
//     }
//   });
// };
