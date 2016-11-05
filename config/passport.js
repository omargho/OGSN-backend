// passport config
var User = require('../models/user/user');
var passport =require('passport');
var LocalStrategy = require('passport-local').Strategy;

module.exports = function (app) {
    app.use(passport.initialize());
    passport.use(new LocalStrategy(User.authenticate()));
    passport.serializeUser(User.serializeUser());
    passport.deserializeUser(User.deserializeUser());
}