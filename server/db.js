const Sequelize = require('sequelize');

const db = {};

const credentials = require('./config.json');

db.sequelize = new Sequelize('lmaps', credentials.dbuser, credentials.dbpassword, {
  host: 'localhost',
  dialect: 'postgres',

  pool: {
    max: 5,
    min: 0,
    idle: 10000
  },
});

module.exports = db;
