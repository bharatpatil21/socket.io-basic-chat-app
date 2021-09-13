const express = require('express');
const app = express();
const socketio = require('socket.io');

app.use(express.static(__dirname + "/public"));

const expressServer = app.listen(9000);

const io = socketio(expressServer);

io.on('connection', (socket) => {
  socket.emit('messageFromServer', { data: "Welcome to socket on server" });
  socket.on('messageToServer', (data) => {
    console.log('data----', data)
  });

  socket.on('newMessageToServer', (data) => {
    console.log('data----', data)
    socket.emit('messageToClient', { text: data.text });
  });
});

