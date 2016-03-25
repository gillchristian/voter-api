'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var zoneSchema = new Schema({
  name: {
    type: String,
    required: true,
    index: { unique: true }
  },
  desc: String,
  goal: {
    type: Number,
    default: 0
  },
  delivered: {
    type: Number,
    default: 0
  }
});

var Zone = mongoose.model('Zone', zoneSchema);

module.exports = Zone;
