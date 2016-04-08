import User from '../models/user';

class AuthController {

  login(req, res) {
    res.sendStatus(400);
  }

  logut(req, res) {
    res.sendStatus(400);
  }

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
        return User.create({ username, password })
          .then((user) => res.status(201).send({ user }));
      })
      .catch((error) => {
        console.log(error);
        return res.status(500).send({ error });
      });
  }
}

export default AuthController;
