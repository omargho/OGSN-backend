var express = require('express');
var router = express.Router();
var User = require('../models/user/user');
var passport = require('passport');
var jwt = require('../config/jwt');

router.post('/register', function (req, res) {
    User.register(new User({
            username: req.body.username, email: req.body.email,
            firstname: req.body.firstname,
            lastname: req.body.lastname
        }),
        req.body.password, function (err, user) {
            if (err) {
                return res.status(500).json({success: false});
            }
            passport.authenticate('local')(req, res, function () {
                return res.status(200).json({success: true});
            });
        });
});

router.post('/login', function (req, res, next) {
    passport.authenticate('local', function (err, user, info) {
        if (err) {
            return next(err);
        }
        if (!user) {
            return res.status(401).json({
                err: "passOrUser"
            });
        }
        req.logIn(user, function (err) {
            if (err) {
                return res.status(500).json({
                    err: 'Could not log in user'
                });
            }

            var token = jwt.getToken(user);
            res.status(200).json({
                status: 'Login successful!',
                success: true,
                token: token
            });
        });
    })(req, res, next);
});

router.get('/logout', function (req, res) {
    req.logout();
    res.status(200).json({
        status: 'Bye!'
    });
});

module.exports = router;
