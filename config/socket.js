var User = require('../models/user/user');
module.exports = function (io) {
    var connectedSockets = {};
    var connectedUsers = [];

    io.on('connection', function (socket) {
        socket.on('id', function (id) {
            socket.userId = id;
            connectedSockets[id] = socket;
            connectedUsers.push(id);
            console.log(id, '  connected');
        });

        socket.on('chat message', function (msg) {
            io.emit('chat message', socket.id + ' say ' + msg);
        });

        socket.on('privateMessage', function (msg) {
            var data = msg.split(",");
            // console.log(data);//from to msg
            if (connectedSockets[data[1]]) {
                connectedSockets[data[1]].emit('receivedMessage', data[2]);
            }
        });

        socket.on('onlineFriends', function () {
            User.findById(socket.userId).populate('friends','username firstname lastname picture')
                .exec(function (err, user) {
                    if (err) {
                        return res.status(500).send(err);
                    }
                    friends = user.friends;
                    var onlineFriends = [];
                    if (friends) {
                        friends.forEach(function (friend) {
                            if (connectedSockets[friend._id])
                                onlineFriends.push(friend);
                        });
                       socket.emit("receivedFriends",onlineFriends);
                    }
                });
        });

        socket.on('disconnect', function () {
            delete connectedSockets[socket.userId];
            var index = connectedUsers.indexOf(socket.userId);
            connectedUsers.splice(index, 1);
            console.log('user disconnected');
        });
    });
}