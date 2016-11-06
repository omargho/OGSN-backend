var userController = require('../controllers/user-controller');
var postController = require('../controllers/post-controller');
var helloController = require('../controllers/hello');
module.exports = [
    {path: '/user', controller: userController},
    {path: '/post', controller: postController},
    {path: '/', controller: helloController}


];