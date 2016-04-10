import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import express from 'express';
import expressSession from 'express-session';
import mongoose from 'mongoose';
import passport from 'passport';
import passportLocal from 'passport-local';
import path from 'path';
import { compareSync } from 'bcrypt';

import User from './models/user';
import config from './config';
import routes from './routes';

const LocalStrategy = passportLocal.Strategy;

passport.use(new LocalStrategy(
  (username, password, done) => {
    User.findOne({ username }, (error, user) => {
      if (error) {
        return done(error);
      }
      if (!user) {
        return done(null, false);
      }
      if (!compareSync(password, user.password)) {
        return done(null, false);
      }
      return done(null, user);
    });
  }
));

passport.serializeUser((user, done) => done(null, user._id));

passport.deserializeUser((id, done) => {
  User.findById(id, (error, user) => {
    done(error, user);
  });
});

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
  mongoose.connect(config.mongodbUrl);
  const port = process.env.port || 3000;
  app.listen(port);
}

export default app;
