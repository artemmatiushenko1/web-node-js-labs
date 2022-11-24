import Router from './router.js';

const router = new Router();

router
  .get('/todo', (req, res) => {
    res.status(200);
    res.json({
      todos: [{ id: 1, text: '1 Make simple nodejs server' }],
    });
  })
  .post('/post', (req, res, { payload }) => {
    console.log(payload);
    res.json(payload);
  })
  .delete('/delete', (req, res) => {
    res.json({ data: 'delete' });
  });

export default router;
