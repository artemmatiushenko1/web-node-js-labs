import http from 'http';
import router from './api.js';

const server = http.createServer(async (req, res) => {
  await router.handle(req, res);
});

server.listen(parseInt(process.env.PORT) || 8080);

const stop = () => {
  server.close((err) => {
    if (err) {
      console.error(err);
    }
  });
  process.exit(0);
};

process.on('SIGINT', stop).on('SIGTERM', stop);

server.on('clientError', (err, socket) => {
  socket.end('HTTP/1.1 400 Bad Request\r\n\r\n');
});
