'use strict';

const Sequelize = require('sequelize');
const bcrypt = require('bcrypt');
const uuid = require('uuid');

const db = require('../db.js');

const saltRounds = 10;
const dm = {};

dm.Users = db.sequelize.define(
  'users',
  {
    username: {
      type: Sequelize.STRING, 
      allowNull: false,
      unique: true
    },
    hashedPass: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    idToken: {
      type: Sequelize.STRING,
      unique: true
    },
    name: {
      type: Sequelize.STRING
    },
    surname: {
      type: Sequelize.STRING
    },
    email: {
      type: Sequelize.STRING,
      unique:true
    },
    clearance: {
      type: Sequelize.STRING,
      allowNull: false,
    }
  },
  {
    timestamps: true
  }
);

dm.getUserHash = function(username) {
  let queryParam = {
    attributes: ['hashedPass','clearance', 'idToken', 'username'],
    where: {
      username: username
    }
  }
  return dm.Users.findOne(queryParam);
}

dm.getUserWithToken = function(token) {
  let queryParam = {
    where: {
      idToken: token
    }
  }
  return dm.Users.findOne(queryParam);
}

dm.setNewIdToken = function(user) {
  return new Promise(function(resolve,reject) {
    let newToken = uuid.v4();
    dm.Users.findOne({ where: { username: user } })
      .then(data =>
        data.updateAttributes({
          idToken: newToken
        }))
      .then(() => {
        resolve(newToken);
      })
      .catch((err) => {
        reject(err)
      });
  });
}


dm.checkPass = function(pass, hash) {
  return new Promise(function(resolve,reject) {
    bcrypt.compare(pass, hash, function (err, res) {
      if (err) {
        reject(err);
      }
      else if (res) {
        resolve(true);
      } else {
        resolve(false);
      }
    });
  });
}

dm.getWithCredentials = function*(username,pass) {
  let userInfo = yield new Promise(function(resolve,reject) {
    try {
      let query = dm.getUserHash(username);
      resolve(query);
    } catch (err) {
      reject(err);
    }
  });
  let passOK = yield dm.checkPass(pass, userInfo.hashedPass);
  if (passOK) {
    let token;
    if (userInfo.idToken && userInfo.idToken !== null && userInfo.idToken !=='') {
      token = userInfo.idToken;
    } else {
      let newToken = yield dm.setNewIdToken(username);
      if (newToken && newToken !== '') {
        token = newToken;
      } else {
        throw new Error('Error setting new token.');
      }
    }
    return {
      status: 'Authorized',
      idToken: token,
      clearance: userInfo.clearance,
      username: userInfo.username
    };
  } else {
    return {
      status: 'Unauthorized',
      error: 'Wrong user or password.'
    };
  }
}

// dm.getWithCredentials = function(username,pass) {
//   return new Promise(function(resolve,reject){
//     let userInfo = dm.getUserHash(username);
//   });
// }

dm.createUser = function(user) {
  return dm.Users.create({username: user.username, hashedPass: user.hashedPass, clearance: user.clearance});
};

module.exports = dm;
