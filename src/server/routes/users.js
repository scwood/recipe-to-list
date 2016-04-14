import { Router } from 'express';

import UserController from '../controllers/UserController';

const router = new Router();
const userController = new UserController();

router.route('/')
  .get(userController.getUser)
  .post(userController.verifyLoginParams, userController.postUser);
router.post('/authenticate', userController.verifyLoginParams, userController.authenticate);
router.route('/recipes')
  .post(userController.postRecipe)
  .delete(userController.deleteRecipes);
router.delete('/recipes/:id', userController.deleteRecipe);

export default router;
