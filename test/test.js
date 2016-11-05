var assert = require('assert');
var supertest = require("supertest");
var should = require("should");
var mongoose = require('mongoose');
var User = require('../models/user/user')
var server = supertest.agent("http://localhost:3000");
var user1 = {
    username: "user1",
    password: "user1",
    email: "use@r1.com",
    firstname: "dd",
    lastname: "gh"
};

describe("create User", function () {
    before(function (done) {
        db = mongoose.connect(require('../config/vars').mongoUrl);
        User.findOneAndRemove({
            username: user1.username
        }, function (err) {
            if (err)
                console.log(err);
        });
        done();
    });

    after(function (done) {
        mongoose.connection.close();
        done();
    });
    it("register user", function (done) {
        server
            .post('/user/register')
            .send(user1)
            .expect("Content-type", /json/)
            .expect(200)
            .end(function (err, res) {
                res.status.should.equal(200);
                res.body.success.should.equal(true);
                done();
            });
    });
});

describe("create User", function () {
    before(function (done) {
        db = mongoose.connect(require('../config/vars').mongoUrl);
        User.findOneAndRemove({
            username: user1.username
        }, function (err) {
            if (err)
                console.log(err);
        });
        done();
    });

    after(function (done) {
        mongoose.connection.close();
        done();
    });
    it("register user", function (done) {
        server
            .post('/user/register')
            .send(user1)
            .expect("Content-type", /json/)
            .expect(200)
            .end(function (err, res) {
                res.status.should.equal(200);
                res.body.success.should.equal(true);
                done();
            });
    });
});

describe("login User", function () {
    it("login User", function (done) {
        server
            .post('/user/login')
            .send(user1)
            .expect("Content-type", /json/)
            .expect(200)
            .end(function (err, res) {
                res.status.should.equal(200);
                res.body.success.should.equal(true);
                res.body.token.should.type('string');
                done();
            });
    });


});
