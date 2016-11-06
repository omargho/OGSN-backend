var userController = require('../controllers/user-controller');
var postController = require('../controllers/post-controller');
var relationController = require('../controllers/relation-controller');
module.exports = [
    {path: '/user', controller: userController},
    {path: '/post', controller: postController},
    {path: '/relation', controller: relationController}


];