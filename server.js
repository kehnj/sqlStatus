'use strict';

const Hapi = require('hapi');
const Good = require('good');

const server = new Hapi.Server();
server.connection({
  host: 'localhost',
  port: Number(process.env.PORT || 8000)
});


server.route({
    method: 'GET',
    path: '/',
     handler: function (request, reply) {
       reply('Testing page refresh: '+ new Date().toString());
     }
});

require('./sqlStatus').startRunning();


server.register({
    register: Good,
    options: {
        reporters: {
            console: [{
                module: 'good-squeeze',
                name: 'Squeeze',
                args: [{
                    response: '*',
                    log: '*'
                }]
            }, {
                module: 'good-console'
            }, 'stdout']
        }
    }
}, (err) => {

    if (err) {
        throw err; // something bad happened loading the plugin
    }

    server.start((err) => {

        if (err) {
            throw err;
        }
        server.log('info', 'Server running at: ' + server.info.uri);
    });
});
