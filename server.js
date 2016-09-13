'use strict';

const Hapi = require('hapi');
const Good = require('good');

const server = new Hapi.Server();
server.connection({
  host: 'localhost',
  port: Number(process.env.PORT || 3000)
});


var io = require('socket.io')(server.listener);

io.on('connection', function(socket){

  console.log('Connected!');

  // capture socket.emit from client side
  socket.on('chat message', function(msg){

    // send msg back to client side with io.emit
    io.emit('chat message', msg);
  });


  // send info to client side with io.emit in loop
  setInterval(function () {

    require('./servers/pli').checkPLI(io);

  }, 15000);

});

server.register(require('inert'), (err) => {

    if (err) {
        throw err;
    }

    server.route({
        method: 'GET',
        path: '/',
        handler: function (request, reply) {
            reply.file('index.html');
        }
    });

    server.start((err) => {

        if (err) {
            throw err;
        }

        console.log('Server running at:', server.info.uri);
    });
});
