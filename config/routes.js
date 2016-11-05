var userController = require('../controllers/user-controller');
var helloController = require('../controllers/hello');
module.exports = [
    {path: '/user', controller: userController},
    {path: '/', controller: helloController}


];