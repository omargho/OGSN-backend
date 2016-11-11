module.exports = function (io) {
    var clients=[]
    io.on('connection', function (socket) {
        socket.on('id',function(id){
            socket.idaa=id;
            clients.push(socket.idaa);
        })
        console.log('a user connected');
        socket.emit('clients',clients);
        socket.on('chat message', function (msg) {
            io.emit('chat message', socket.idaa+' say '+msg);
        });
        // io.emit('some event', { for: 'everyone' });
        socket.on('disconnect', function () {
            console.log('user disconnected');
        });
    });

}