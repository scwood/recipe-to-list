import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import express from 'express';
import expressSession from 'express-session';
import passport from 'passport';
import path from 'path';

import './config/passport';
import connectMongo from './config/database';
import config from './config';
import routes from './routes';

const app = express();

app.use(cookieParser());
app.use(bodyParser.json());
app.use(expressSession({
  secret: config.secret,
  resave: false,
  saveUninitialized: false,
}));
app.use(passport.initialize());
app.use(passport.session());
app.use('/api', routes);
app.use(express.static(path.join(__dirname, 'static')));

if (!module.parent) {
  connectMongo(config.mongodbUrl);
  const port = process.env.port || 3000;
  app.listen(port, () => console.log(`Listening on port ${port}`));
}

export default app;
