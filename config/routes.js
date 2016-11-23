module.exports = function (app,session) {
    var userController = require('../controllers/user-controller');
    var postController = require('../controllers/post-controller');
    var relationController = require('../controllers/relation-controller');
//testing session
    session
        .run("MATCH (a:Person) where a.name='omar' RETURN a")
        .subscribe({
            onNext: function(record) {
                console.log(record._fields);
            },
            onCompleted: function() {
                // Completed!
                session.close();
            },
            onError: function(error) {
                console.log(error);
            }
        });


    app.use('/user', userController);
    app.use('/post', postController);
    app.use('/relation', relationController);
};