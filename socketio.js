const socketio = require('socket.io');
const Message = require('./models/messages');
let users = []

module.exports.listen = function(server) {
  const io = socketio.listen(server)
  io.on('connection', function(socket){
    users.push(socket.id);
    // console.log(socket);
    socket.on('newmessage', (data) => {
      const message = new Message(data);
      message.save()
      .then(msg => {
        console.log(message);
      })
      .catch(err => {
        console.log(err);
      })
    });
  });

  return io;
}