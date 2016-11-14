var assert = require('assert');
var supertest = require("supertest");
var should = require("should");
var mongoose = require('mongoose');
var User = require('../models/user/user')
var server = supertest.agent("http://localhost:3000");
var user1 = {
    username: "o",
    password: "o",
    email: "useo@r.com",
    firstname: "dd",
    lastname: "gh"
};
var user2 = {
    username: "user 2",
    password: "user 2",
    email: "use@r2.com",
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
    it("register user 1", function (done) {
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


describe("login User 1", function () {
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
                user1.token=res.body.token;
                user1.id=res.body.id;
                done();
            });
    });


});
describe("create User", function () {
    before(function (done) {
        db = mongoose.connect(require('../config/vars').mongoUrl);
        User.findOneAndRemove({
            username: user2.username
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
    it("register user 2", function (done) {
        server
            .post('/user/register')
            .send(user2)
            .expect("Content-type", /json/)
            .expect(200)
            .end(function (err, res) {
                res.status.should.equal(200);
                res.body.success.should.equal(true);
                done();
            });
    });
});


describe("login User 1", function () {
    it("login User", function (done) {

        server
            .post('/user/login')
            .send(user2)
            .expect("Content-type", /json/)
            .expect(200)
            .end(function (err, res) {
                res.status.should.equal(200);
                res.body.success.should.equal(true);
                res.body.token.should.type('string');
                user2.token=res.body.token;
                user2.id=res.body.id;
                done();
            });
    });


});

describe("user posting", function () {
    it("user posting", function (done) {

        server
            .post('/post')
            .set('x-access-token', user1.token)
            .send({"text":"ping ping"})
            .expect("Content-type", /json/)
            .expect(200)
            .end(function (err, res) {
                res.status.should.equal(200);
                res.body.text.should.equal("ping ping");
                done();
            });
    });


});

describe("user follow", function () {
    it("user follow", function (done) {

        server
            .post('/relation/follow')
            .set('x-access-token', user2.token)
            .send({"followingId":user1.id})
            .expect("Content-type", /json/)
            .expect(200)
            .end(function (err, res) {
                res.status.should.equal(200);
                res.body.success.should.equal(true);
                done();
            });
    });


});

describe("user get posts", function () {
    it("user get posts", function (done) {

        server
            .get('/post')
            .set('x-access-token', user2.token)
            .expect("Content-type", /json/)
            .expect(200)
            .end(function (err, res) {
                res.status.should.equal(200);
                res.body.should.be.an.Array();
                res.body.should.have.length(1);
                done();
            });
    });


});
