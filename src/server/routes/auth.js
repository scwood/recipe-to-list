import { Router } from 'express';

import AuthController from '../controllers/AuthController';

const routes = new Router();
const authController = new AuthController();

routes.post('/login', authController.login);
routes.post('/logout', authController.logut);
routes.post('/register', authController.register);

export default routes;
