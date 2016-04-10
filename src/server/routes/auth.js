import passport from 'passport';
import { Router } from 'express';

import AuthController from '../controllers/AuthController';

const router = new Router();
const authController = new AuthController();

router.post('/register',
            authController.verifyLoginParams,
            authController.register.bind(authController));
router.post('/login',
            authController.verifyLoginParams,
            passport.authenticate('local'),
            authController.login.bind(authController));
router.post('/logout', authController.logout);

export default router;
