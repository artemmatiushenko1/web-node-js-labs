import Router from './router.js';

const router = new Router();

router
  .get('/endpoint', (req, res) => {
    res.status(200);
    res.json({ method: req.method, text: 'GET request response example' });
  })
  .post('/endpoint', (req, res, { payload }) => {
    res.status(200);
    res.json({
      method: req.method,
      text: 'POST request response example',
      data: payload,
    });
  })
  .delete('/endpoint', (req, res) => {
    res.status(200);
    res.json({
      method: req.method,
      text: 'DELETE request response example',
    });
  })
  .patch('/endpoint', (req, res, { payload }) => {
    res.status(200);
    res.json({
      method: req.method,
      text: 'PATCH request response example',
      data: payload,
    });
  })
  .options('/endpoint', (req, res) => {
    res.status(200);
    res.json({
      method: req.method,
      text: 'OPTIONS request response example',
    });
  });

export default router;
