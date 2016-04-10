import _ from 'lodash';

import User from '../models/user';

class AuthController {

  register(req, res) {
    const username = req.body.username;
    const password = req.body.password;
    if (!username || !password) {
      return res.status(400).send({ error: 'Missing username or password' });
    }
    return User.find({ username })
      .then((docs) => {
        if (docs.length) {
          return res.status(403).send({ error: 'User with that username already exists' });
        }
        return User.create({ username, password: User.hashPassword(password) })
          .then((user) => res.status(201).send({ user: this.reduceUser(user) }));
      })
      .catch((error) => res.status(500).send({ error }));
  }

  login(req, res) {
    return res.send({ user: this.reduceUser(req.user) });
  }

  logout(req, res) {
    res.sendStatus(501);
  }

  reduceUser(user) {
    const values = ['username', 'recipes', 'shoppingList'];
    return _.pick(user, values);
  }

  verifyLoginParams(req, res, next) {
    if (!req.body.username || !req.body.password) {
      return res.status(400).send({ error: 'Missing username or password' });
    }
    return next();
  }
}

export default AuthController;
