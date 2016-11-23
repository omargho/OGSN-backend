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
                return res.status(500).send(err);
            }
        });
});

router.get('/', jwt.verifyUser, function (req, res) {
    User.findById(req.decoded.id, function (err, user) {
        if (err) {
            return res.status(500).send(err);
        }
        Post.find({
            postedBy: {$in: user.following}
        }).limit(10).skip(0).sort({updatedAt: -1}).exec(
            function (err, posts) {
                if (err)
                    return res.status(500).send(err);
                res.send(posts);
            })
    })
});

router.put('/:postId', jwt.verifyUser, function (req, res) {
    Post.findById(req.params.postId, function (err, post) {
        if (err) {
            return res.status(500).send(err);
        }
        if (post.postedBy != req.decoded.id) {
            var err = new Error('You are not authorized to perform this operation!');
            return res.status(403).send(err);
        }
        if (req.body.text)
            post.text = req.body.text;
        if (req.body.picture)
            post.picture = req.body.picture;

        post.save(function (err, post) {
            if (err)
                res.send(err);
            res.json(post);
        });
    });
});


module.exports = router;
