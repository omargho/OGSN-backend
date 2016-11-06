var express = require('express');
var router = express.Router();
var User = require('../models/user/user');
var passport = require('passport');
var jwt = require('../config/jwt');

router.post('/follow', jwt.verifyUser, function (req, res) {
    User.findById(req.decoded.id, function (err, user) {
        if (err) {
            res.send(err);
        }
        if (req.body.followingId)
            user.following.push(req.body.followingId);
        user.save(function (err, user) {
            if (err)
                return res.status(500).json(err);
            User.findById(req.body.followingId, function (err, user) {
                if (err) {
                    res.send(err);
                }

                user.followers.push(req.decoded.id);
                user.save(function (err, user) {
                    if (err)
                        return res.status(500).json(err);
                });

            });
            res.json({success: true});
        });

    });
})
module.exports = router;
