import _ from 'lodash';
import jwt from 'jsonwebtoken';
import { compareSync, hashSync } from 'bcrypt';

import User from '../models/user';
import config from '../config';

class UserController {

  authenticate(req, res) {
    const { username, password } = req.body;
    User.findOne({ username })
      .then((user) => {
        if (!user || !compareSync(password, user.password)) {
          return res.status(401).send({ error: 'Incorrect username and/or password' });
        }
        const token = jwt.sign({ username: user.username }, config.secret);
        return res.send({ success: true, token });
      })
      .catch((error) => res.status(500).send({ error }));
  }

  postUser(req, res) {
    const { username, password } = req.body;
    return User.find({ username })
      .then((docs) => {
        if (docs.length) {
          return res.status(403).send({ error: 'User with that username already exists' });
        }
        const saltRounds = 10;
        return User.create({ username, password: hashSync(password, saltRounds) })
          .then(() => res.status(201).send({ success: true }));
      })
      .catch((error) => res.status(500).send({ error }));
  }

  verifyLoginParams(req, res, next) {
    const { username, password } = req.body;
    if (!username && !password) {
      return res.status(400).send({ error: 'Missing username and password' });
    }
    if (!username) {
      return res.status(400).send({ error: 'Missing username' });
    }
    if (!password) {
      return res.status(400).send({ error: 'Missing password' });
    }
    return next();
  }

  getUser(req, res) {
    res.sendStatus(501);
  }

  postRecipe(req, res) {
    res.sendStatus(501);
  }

  deleteRecipes(req, res) {
    res.sendStatus(501);
  }

  deleteRecipe(req, res) {
    res.sendStatus(501);
  }

  reduceUser(user) {
    const values = ['username', 'recipes', 'shoppingList'];
    return _.pick(user, values);
  }
}

export default UserController;
