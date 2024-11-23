import { Router } from 'express';
import container from '../utils/iocContainer.util';
import asyncHandler from '../utils/asyncHandler.util';
import AuthController from '../controllers/auth.controller';

const router = Router();
const authController = container.get(AuthController);

router.post('/login', asyncHandler(authController.login.bind(authController)));
router.post('/logout', asyncHandler(authController.logout.bind(authController)));
router.post('/register', asyncHandler(authController.register.bind(authController)));
router.post('/refreshToken', asyncHandler(authController.refreshToken.bind(authController)));

export default router;