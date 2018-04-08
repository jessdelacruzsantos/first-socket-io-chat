var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var nameById = {};

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket){
  socket.on('name-input', function(name){
    if (!nameById[socket.id]) {
      nameById[socket.id] = name;

      io.emit('chat message', `${name} has connected`, socket.id);
    }
  })
  socket.on('disconnect', function(){
    io.emit('chat message', `${nameById[socket.id]} has disconnected`, socket.id);
  });
  socket.on('chat message', function(msg){
      io.emit('chat message', `${nameById[socket.id]}: ${msg}`, socket.id);
  });
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});

