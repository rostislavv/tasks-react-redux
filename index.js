const server = require('./api/server');
const { port } = require('./config/server');

server.listen(process.env.PORT || port, function listen() {
  const port = this.address().port;
  console.log('Server listening at http://localhost:%s', port);
});
