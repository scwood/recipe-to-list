class UsersController {

  getUser(req, res) {
    return res.send({ user: req.user });
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

  isAuthenticated(req, res, next) {
    if (!req.user) {
      res.status(401).send({ error: 'Must be logged in' });
    }
    return next();
  }

}

export default UsersController;
