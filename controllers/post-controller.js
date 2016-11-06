var express = require('express');
var router = express.Router();
var Post = require('../models/post/post');
var User = require('../models/user/user');
var jwt = require('../config/jwt');

router.post('/', jwt.verifyUser, function (req, res) {
    var data = req.body;
    data["postedBy"] = req.decoded.id;
    Post(data).save().then(function (post) {
            return res.send(post);
        })
        .catch(function (err) {
            if (err) {
                console.log(err);
                return res.send(err);
            }
        });
});

router.get('/', jwt.verifyUser, function (req, res) {
    User.findById(req.decoded.id, function (err, user) {
        if (err) {
            res.send(err);
        }
        Post.find({
                postedBy: {$in: user.following}
            }).limit(10).skip(0).sort({ updatedAt: -1 }).exec(
            function (err, posts) {
                if (err)
                    res.status(500).send(err);
                res.send(posts);
            })
    })
})
;


module.exports = router;
