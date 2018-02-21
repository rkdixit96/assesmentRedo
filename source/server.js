const Hapi = require('hapi');
const routes = require('../routes');


const server = new Hapi.Server();

server.connection({
  port: 9000,
  host: 'localhost',
});

server.route(routes);

if (!module.parent) {
  server.start((error) => {
    if (error) {
      throw error;
    }
  });
}

module.exports = server;

