'use strict';

const atob = require('atob');


const userModel = require('../models/users.js');

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
    let passOK = yield userModel.checkPass(auth[1], userInfo.hashedPass);
    if (passOK) {
      if (userInfo.idToken && userInfo.idToken !== null && userInfo.idToken !=='') {
        this.status = 200;
        this.body = {
          status: 'Authorized',
          idToken: userInfo.idToken
        };
      } else {
        let newToken = yield userModel.setNewIdToken(auth[0]);
        if (newToken && newToken !== '') {
          this.status = 200;
          this.body = {
            status: 'Authorized',
            idToken: newToken
          };
        } else {
          this.status = 500;
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
