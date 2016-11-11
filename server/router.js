'use strict';

const router = require('koa-router')();
const bodyParser = require('body-parser');

const usersCtrl = require('./controllers/users.js');

router.get('/login', usersCtrl.login);
// router.post('/createuser', usersCtrl.createUser);

module.exports = router;
