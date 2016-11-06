var mongoose = require('mongoose');
var timestamps = require('mongoose-timestamp');
var Schema = require('./schema').Schema;

Schema.plugin(timestamps);

module.exports = mongoose.model('Post', Schema);