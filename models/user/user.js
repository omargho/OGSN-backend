var mongoose = require('mongoose');
var passportLocalMongoose = require('passport-local-mongoose');
var timestamps = require('mongoose-timestamp');
var Schema = require('./schema').Schema;

Schema.plugin(passportLocalMongoose);
Schema.plugin(timestamps);

module.exports = mongoose.model('User', Schema);