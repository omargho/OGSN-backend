var assert = require('assert');
describe('Array', function () {
    describe('#indexOf()', function () {
        it('should return -1 when the value is not present', function () {
            assert.equal(-1, [1, 2, 3].indexOf(4));
        });
    });
});


var supertest = require("supertest");
var should = require("should");

var app = require('../app');

// UNIT test begin

describe("test User",function(){



    it("should return respond with a resource",function(done){


        supertest(app)
            .get("/user")
            .expect("Content-type",/json/)
            .expect(200)
            .end(function(err,res){
                res.status.should.equal(200);
                res.text.should.equal('respond with a resource');
                done();
            });
    });

});
