import jwt from 'jsonwebtoken';
import emailjs from 'emailjs';

import User from '../models/user';
import config from '../config';

class UserController {

  getUser(req, res) {
    return res.sendStatus(501);
  }

  postUser(req, res) {
    const testUser = {
      email: 'spencercwood@gmail.com',
      name: 'Spencer',
      password: 'password',
    };
    User.create(testUser);
    return res.sendStatus(200);
  }

  createToken(req, res) {
    const { email, password } = req.body;
    User.findOne({ email })
      .then((user) => {
        if (!user || !user.comparePassword(password)) {
          return res.status(401).send({ error: 'Incorrect email/password combination' });
        }
        const token = jwt.sign({ email }, config.secret);
        return res.send({ token });
      })
      .catch((error) => {
        res.status(500).send({ error });
      });
  }

  sendSignUpEmail(req, res) {
    const { email, name, password } = req.body;
    User.find({ email })
      .then((docs) => {
        if (docs.length) {
          return res.status(403).send({ error: 'A user with that email address already exists' });
        }
        const token = jwt.sign({ email, name, password }, config.secret);
        const link = `${req.protocol}://${req.get('host')}/emailConfirmed/${token}`;
        const from = `RecipeToList <${config.email.username}>`;
        const to = email;
        const subject = 'RecipeToList email confirmation';
        const text = `Click the link below to confirm your email:\n${link}`;
        const server = emailjs.server.connect({
          user: config.email.username,
          password: config.email.password,
          host: config.email.host,
          ssl: true,
        });
        return server.send({ from, to, subject, text }, (error) => {
          if (error) {
            return res.send({ error });
          }
          return res.send({ success: true });
        });
      })
      .catch((error) => res.status(500).send({ error }));
  }

  postRecipe(req, res) {
    return res.sendStatus(501);
  }

  deleteRecipe(req, res) {
    return res.sendStatus(501);
  }

  deleteRecipes(req, res) {
    return res.sendStatus(501);
  }

  verifyLoginParams(req, res, next) {
    const required = ['email', 'password'];
    return this.reportMissingParams(req, res, next, required);
  }

  verifyRegisterParams(req, res, next) {
    const required = ['email', 'name', 'password'];
    return this.reportMissingParams(req, res, next, required);
  }

  verifyPostUserParams(req, res, next) {
    const required = ['token'];
    return this.reportMissingParams(req, res, next, required);
  }

  reportMissingParams(req, res, next, required) {
    const missing = [];
    required.forEach((param) => {
      if (!req.body[param]) {
        missing.push(param);
      }
    });
    if (!missing.length) {
      return next();
    }
    if (missing.length === 1) {
      return res.status(400).send({ error: `Missing required parameter: ${missing[0]}` });
    }
    const missingString = missing.join(', ');
    return res.status(400).send({ error: `Missing required parameters: ${missingString}` });
  }
}

export default UserController;
