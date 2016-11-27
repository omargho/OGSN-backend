module.exports = function (io) {
    var connectedSockets = {};
    var connectedUsers = [];

    io.on('connection', function (socket) {
        console.log(connectedUsers);
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
            console.log(connectedUsers);
            var data = msg.split(",");
            // console.log(data);//from to msg

            if (connectedSockets[data[1]]) {
                console.log(socket.userId, " send to ", connectedSockets[data[1]].userId);
                connectedSockets[data[1]].emit('receivedMessage', data[2]);
            }
        });

        socket.on('disconnect', function () {
            delete connectedSockets[socket.userId];
            var index = connectedUsers.indexOf(socket.userId);
            connectedUsers.splice(index, 1);
            console.log('user disconnected');
        });
    });

}