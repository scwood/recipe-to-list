import { Router } from 'express';

import UsersController from '../controllers/UsersController';

const routes = new Router();
const usersController = new UsersController();

routes.get('/:email', usersController.getUser);
routes.post('/recipes', usersController.postRecipe);
routes.delete('/recipes', usersController.deleteRecipes);
routes.delete('/recipes/:id', usersController.deleteRecipe);

export default routes;
