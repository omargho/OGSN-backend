var User = require('../models/user/user');
var jwt = require('jsonwebtoken');
var vars = require('./vars');

exports.getToken = function (user) {
    return jwt.sign({id:user._id}, vars.secretKey, {
        expiresIn: 3600*24
    });
};

exports.verifyUser = function (req, res, next) {
    // check header or url parameters or post parameters for token
    var token = req.body.token || req.query.token || req.headers['x-access-token'];

    // decode token
    if (token) {
        // verifies secret and checks exp
        jwt.verify(token, vars.secretKey, function (err, decoded) {
            if (err) {
                var error = new Error('You are not authenticated!');
                error.status = 401;
                next(error);
            } else {
                // if everything is good, save to request for use in other routes

                req.decoded = decoded;
                next();
            }
        });
    } else {
        // if there is no token
        // return an error
        var err = new Error('No token provided!');
        err.status = 403;
        return next(err);
    }
};