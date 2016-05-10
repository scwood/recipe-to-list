import { Router } from 'express';

import UserController from '../controllers/UserController';

const router = new Router();
const controller = new UserController();

router.route('/')
  .get(controller.getUser)
  .post(
    controller.verifyPostUserParams.bind(controller),
    controller.postUser);

router.post(
  '/token',
  controller.verifyLoginParams.bind(controller),
  controller.createToken);

router.post(
  '/signUpEmail',
  controller.verifyRegisterParams.bind(controller),
  controller.sendSignUpEmail.bind(controller));

router.route('/recipes')
  .post(controller.postRecipe)
  .delete(controller.deleteRecipes);

router.delete('/recipes/:id', controller.deleteRecipe);

export default router;
