'use strict';

const panelModel = require('../models/panels.js');
const getPermission = require('../permissions.js');

const ep = {};

ep.createPanel = function * () {
  // // TODO: create panel from the body of the request
};

ep.createMockPanel = function * () {
  if (getPermission('CREATE_PANEL',this.response.header['x-user'])) {
    try {
      let res = yield panelModel.Panels.create({
        identifier: 'EP-L-002',
        totalPower: 5850,
        totalIncidences: 2,
        photo: '',
        latitude: 41.393416,
        longitude: 2.196478
      });
      this.status = 200;
      this.body = 'Mock created';
    } catch (err) {
      // TODO: Handle duplicate error 'SequelizeUniqueConstraintError: Validation error'
      this.status = 500;
      this.body = 'Error: '+err;
    }
  } else {
    this.status = 401;
    this.body = 'Not permission for creating panels.';
  }
}

ep.getPanels = function * () {
  if (getPermission('CREATE_PANEL',this.response.header['x-user'])) {
    let queryParam = {
      where: {
        // TODO: position of panels inside area (makes no sense load all
        // element if we can only see a few)
      }
    }
    this.type = 'json';
    try {
      const panels = yield panelModel.Panels.find(queryParam);
      this.body = panels;
    } catch (err) {
      this.status = 500;
      this.body = err;
    }
  } else {
    this.status = 401;
    this.body = 'Not permission for getting panels.';
  }
};

module.exports = ep;
