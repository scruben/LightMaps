'use strict';

const mongoose = require('mongoose');

const eventSchema = mongoose.Schema({
    "title": { type : String},
    "date": { type : Date},
    "venue": { type : String}
});

mongoose.model('Event', eventSchema);
