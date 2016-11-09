'use strict';

const db = require('../db.js');
const Sequelize = require('sequelize');

const dm = {};

dm.Users = db.sequelize.define(
  'users',
  {
    username: {
      type: Sequelize.STRING, //TODO: set required and unique for some fields
      allowNull: false,
    },
    hashedPass: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    idToken: {
      type: Sequelize.STRING
    },
    name: {
      type: Sequelize.STRING
    },
    surname: {
      type: Sequelize.STRING
    },
    email: {
      type: Sequelize.STRING,
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

dm.changeUserToken = function(username,newToken) {
  dm.Users.findOne({ where: { username: username } })
    .then((data) =>{
      console.log('found');
      data.updateAttributes({
        idToken: newToken
      }).then(() => {
        return true;
      })
    })
    .catch((err) => {
      return false;
    });
}

dm.createUser = function(user) {
  return dm.Users.create({username: user.username, hashedPass: user.hashedPass, clearance: user.clearance});
};

module.exports = dm;
