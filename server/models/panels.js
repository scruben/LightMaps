'use strict';

const Sequelize = require('sequelize');

const db = require('../db.js');

let ep = {};

ep.Panels = db.sequelize.define(
  'panels',
  {
    identifier: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true
    },
    totalPower: {
      type: Sequelize.INTEGER,
    },
    totalIncidences: {
      type: Sequelize.INTEGER,
    },
    photo: {
      type: Sequelize.BLOB, //TODO: Use binary and store the image itself
    },
    latitude: {
      type: Sequelize.DOUBLE,
      allowNull: false,
    },
    longitude: {
      type: Sequelize.DOUBLE,
      allowNull: false,
    }
  },
  {
    timestamps: true
  }
);


module.exports = ep;
