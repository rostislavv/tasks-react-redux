const server = require('./api/server');
const config = require('./config/server');

server.listen(config.port, function listen() {
  const port = this.address().port;
  console.log('Server listening at http://localhost:%s', port);
});
