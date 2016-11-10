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
      type: Sequelize.STRING, //TODO: check the unique modifier it is working
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
    attributes: ['hashedPass','clearance', 'idToken'],
    where: {
      username: username
    }
  }
  return dm.Users.findOne(queryParam);
}

dm.setNewIdToken = function(user) {
  return new Promise(function(resolve,reject) {
    try {
      let newToken = uuid.v4();
      dm.Users.findOne({ where: { username: user } })
        .then((data) =>{
          data.updateAttributes({
            idToken: newToken
          }).then(() => {
            resolve(newToken);
          })
        })
        .catch((err) => {
          reject(err)
        });
    } catch (err) {
      reject(err);
    }
  });
}


dm.checkPass = function(pass, hash) {
  return new Promise(function(resolve,reject) {
    bcrypt.compare(pass, hash, function (err, res) {
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
}

dm.createUser = function(user) {
  return dm.Users.create({username: user.username, hashedPass: user.hashedPass, clearance: user.clearance});
};

module.exports = dm;
