import bodyParser from 'body-parser';
import express from 'express';
import mongoose from 'mongoose';
import path from 'path';

import config from './config';
import routes from './routes';

const app = express();

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/api', routes);
app.get('*', (req, res) => res.sendFile('index.html'));

if (!module.parent) {
  mongoose.connect(config.mongodbUrl);
  const port = process.env.port || 3000;
  app.listen(port);
}

export default app;
