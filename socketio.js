const socketio = require('socket.io');

module.exports.listen = function(server) {
  const io = socketio.listen(server)
  io.on('connection', function(socket){
    console.log('user connected');
    socket.on('message', (data) => {
      console.log(data);
    });
  });

  return io;
}