module.exports = function (io) {
    var connectedSockets = {};
    var connectedUsers = [];
    io.on('connection', function (socket) {
        socket.on('id', function (id) {
            connectedSockets[id] = socket;
            connectedUsers.push(id);
            console.log(id, '  connected');
        })

        socket.on('chat message', function (msg) {
            io.emit('chat message', socket.id + ' say ' + msg);
        });

        socket.on('privateMessage', function (msg) {
            var data = msg.split(",");
           // console.log(data);//from to msg
            if (connectedSockets[connectedUsers[data[1]]]) {
           //  console.log(data[0],'  send  ',data[2],' to  ',connectedUsers[data[1]]);
             //   console.log(connectedUsers);

                connectedSockets[connectedUsers[data[1]]].emit('receivedMessage', data[2]);
            }
        });
        // io.emit('some event', { for: 'everyone' });
        socket.on('disconnect', function () {
            console.log('user disconnected');
        });
    });

}