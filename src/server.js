import http from 'http';
import router from './api.js';

const server = http.createServer(async (req, res) => {
  await router.handle(req, res);
});

server.listen(parseInt(process.env.PORT) || 8080);

['SIGTERM', 'SIGINT'].forEach((eventName) => {
  process.on(eventName, () => {
    server.close((err) => {
      if (err) {
        console.error(err);
      }
    });
    process.exit(0);
  });
});
