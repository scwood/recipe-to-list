import { Router } from 'express';

import UsersController from '../controllers/UsersController';

const router = new Router();
const usersController = new UsersController();

router.get('/:email', usersController.getUser);
router.post('/recipes', usersController.postRecipe);
router.delete('/recipes', usersController.deleteRecipes);
router.delete('/recipes/:id', usersController.deleteRecipe);

export default router;
