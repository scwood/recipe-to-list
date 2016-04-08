import { Router } from 'express';

import authRoutes from './auth';
import userRoutes from './users';

const routes = new Router();

routes.use('/', authRoutes);
routes.use('/users', userRoutes);

export default routes;