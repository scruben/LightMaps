'use strict';

const koa = require('koa');

const config = require('./config.json');
const router = require('./router.js');
const db = require('./db.js');
const loadUserAuth = require('./auth.js');

const app = koa();

app.use(router.routes());

const port = config.port;

db.sequelize.sync()
  .then(function() {
    app.listen(port, function () {
      console.log('Database connection successful. Server listening on port ' + port);
    });
  })
  .catch(function(){
    console.log('Database connecting error. Server not listening.');
  });
