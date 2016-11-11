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
        //User.findOneAndRemove({
        //    username: user1.username
        //}, function (err) {
        //    if (err)
        //        console.log(err);
        //});
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
                //res.status.should.equal(200);
                //res.body.success.should.equal(true);
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
                user1.token=res.body.token;
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
            .set('x-access-token', user1.token)
            .send({"followingId":"581e6e541429ef2cb3fc98c1"})
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
            .set('x-access-token', user1.token)
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
