'use strict';

const http = require('http');
const koa = require('koa');
const bodyParser = require('koa-bodyparser');
const cors = require('koa-cors');

const config = require('./config.json');
const router = require('./router.js');
const db = require('./models');
const app = koa();

app.use(cors());
app.use(bodyParser());
app.use(router.routes());

const hostname = config.dev.hostname;
const port = config.dev.port;

db.connection.on('error', console.error.bind(console, 'connection error on db:'));
db.connection.once('open', function() {
  app.listen(config.dev.port, function () {
    console.log('Koa server listening on port ' + config.dev.port);
  });
});
