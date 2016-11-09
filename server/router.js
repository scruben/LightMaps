'use strict';

const router = require('koa-router')();
const bodyParser = require('body-parser');

const eventsCtrl = require('./controller.js');

router.get('/events', eventsCtrl.getLatest);

router.post('/events', eventsCtrl.post);

module.exports = router;
