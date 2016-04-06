import express from 'express';

const app = express();

app.get('/api/test', (req, res) => {
  res.send({ success: true });
});

if (!module.parent) {
  app.listen(3000, () => {
    console.log('Listening on port 3000');
  });
}

export default app;
