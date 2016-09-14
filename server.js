'use strict';

const Hapi = require('hapi');
const Inert = require('inert')
const Pli = require('./servers/pli');

var server = new Hapi.Server();

server.connection({
  port: Number(process.env.PORT || 3000)
});

var io = require('socket.io')(server.listener);

server.register(Inert);
server.route(require('./routes')); //we require here as we never really "use it".

io.on('connection', function(socket){
  console.log('websocket connection made'); //really just a debugging check
});

//kick off the sql checking
Pli.checkSQL(io);

server.start((err) => {

    if (err) {
        throw err;
    }

    console.log('Server running at:', server.info.uri);
});
