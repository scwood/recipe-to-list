import passport from 'passport';
import passportLocal from 'passport-local';

import User from '../models/user';

const LocalStrategy = passportLocal.Strategy;

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
