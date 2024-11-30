import { Router } from 'express';
import container from '../utils/iocContainer.util';
import asyncHandler from '../utils/asyncHandler.util';
import UserController from '../controllers/user.controller';
import tokenMiddleware from '../middlewares/token.middleware';

const router = Router();
const userController = container.get(UserController);

router.use(tokenMiddleware);

router.get('/me', asyncHandler(userController.getCurrentUser.bind(userController)));

export default router;