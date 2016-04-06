import express from 'express';

const app = express();

app.get('/api/test', (req, res) => {
  res.send({ success: true });
});

if (!module.parent) {
  const port = process.env.port || 3000;
  app.listen(port, () => console.log(`Listening on port ${port}`));
}

export default app;
