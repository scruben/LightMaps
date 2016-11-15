'use strict';

const atob = require('atob');


const userModel = require('../models/users.js');

exports.login = function* (next) {
  try {
    let auth = this.request.header.authorization.split(' ')[1];
    auth = atob(auth).split(':');
    let res = yield userModel.getWithCredentials(auth[0],auth[1]);
    this.status = (res.status === 'Authorized')?200:401;
    this.body = res;
  } catch (err) {
    this.status = 500;
    this.body = err;
  }
};
