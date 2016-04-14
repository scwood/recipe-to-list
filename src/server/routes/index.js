import { Router } from 'express';

import userRoutes from './users';

const routes = new Router();

routes.use('/user', userRoutes);

export default routes;
