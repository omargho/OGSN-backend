var express = require('express');
var router = express.Router();
var User = require('../models/user/user');
var passport = require('passport');
var jwt = require('../config/jwt');

router.post('/request', jwt.verifyUser, function (req, res) {
    if (!req.body.friendId)
        res.status(400).send(new Error("friend Id not specified"));

    User.findById(req.body.friendId, function (err, user) {
        if (err) {
            return res.status(500).send(err);
        }
        if (!user)
            return res.status(400).send(new Error("user does not exist anymore"));

        if (user.friends.indexOf(req.decoded.id) != -1)
            return res.status(400).send(new Error("already a friend"));

        user.friendshipRequest.push(req.decoded.id);
        user.save(function (err, user) {
            if (err)
                return res.status(500).send(err);
            res.json({success: true});
        });

    });
});

router.delete('/request', jwt.verifyUser, function (req, res) {
    console.log(req.body);
    User.findById(req.decoded.id, function (err, user) {
        if (err) {
            return res.status(500).send(err);
        }
        if (!user)
            return res.status(400).send(new Error("user does not exist anymore"));

        if (!req.body.friendId)
            return res.status(400).send(new Error("friend Id not specified"));

        //delete accepted friend from list of friends requests
        var index = user.friendshipRequest.indexOf(req.body.friendId);
        if (index != -1)
            user.friendshipRequest.splice(index, 1);

        user.save(function (err, userA) {
            if (err)
                return res.status(500).send(err);
            res.json({success: true});
        });

    })
});

router.post('/friend', jwt.verifyUser, function (req, res) {
    User.findById(req.decoded.id, function (err, user) {
        if (err) {
            return res.status(500).send(err);
        }
        if (!user)
            return res.status(400).send(new Error("user does not exist anymore"));

        if (!req.body.friendId)
            return res.status(400).send(new Error("friend Id not specified"));

        //delete accepted friend from list of friends requests
        var index = user.friendshipRequest.indexOf(req.body.friendId);
        if (index != -1)
            user.friendshipRequest.splice(index, 1);

        //add him to the list of his friends
        user.friends.push(req.body.friendId);
        user.save(function (err, userA) {
            if (err)
                return res.status(500).send(err);
            //add this user to the list of the sender's friend
            User.findById(req.body.friendId, function (err, user) {
                if (err) {
                    return res.status(500).send(err);
                }
                if (!user)
                    return res.status(400).send(new Error("user does not exist anymore"));

                user.friends.push(req.decoded.id);
                user.save(function (err, userB) {
                    if (err)
                        return res.status(500).send(err);
                    res.json({success: true});
                });
            });
        });
    });
});

router.delete('/friend', jwt.verifyUser, function (req, res) {
    User.findById(req.decoded.id, function (err, user) {
        if (err) {
            return res.status(500).send(err);
        }
        if (!user)
            return res.status(400).send(new Error("user does not exist anymore"));

        if (!req.body.friendId)
            return res.status(400).send(new Error("friend Id not specified"));

        var index = user.friends.indexOf(req.body.friendId);
        if (index != -1)
            user.friends.splice(index, 1);

        user.save(function (err, userA) {
            if (err)
                return res.status(500).send(err);
            User.findById(req.body.friendId, function (err, user) {
                if (err) {
                    return res.status(500).send(err);
                }
                if (!user)
                    return res.status(400).send(new Error("user does not exist anymore"));
                var index = user.friends.indexOf(req.decoded.id);
                if (index != -1)
                    user.friends.splice(index, 1);

                user.save(function (err, userB) {
                    if (err)
                        return res.status(500).send(err);
                    res.json({success: true});
                });
            });
        });

    })
});
//TODO get friend (populate)
router.get('/friend', jwt.verifyUser, function (req, res) {
    User.findById(req.decoded.id, 'username firstname lastname picture')
        .populate('friends')
        .exec(function (err, friends) {
            res.send(friends);
        });
});

module.exports = router;
