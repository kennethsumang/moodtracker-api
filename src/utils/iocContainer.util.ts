import { Container } from 'inversify';
import { PrismaClient } from '@prisma/client';
import AuthService from '../services/auth.service';
import AuthController from '../controllers/auth.controller';
import UserRepository from '../repositories/user.repository';
import UserController from '../controllers/user.controller';
import UserService from '../services/user.service';

const container = new Container();

container.bind<PrismaClient>(PrismaClient).toSelf().inSingletonScope();

container.bind<UserRepository>(UserRepository).toSelf();
container.bind<AuthService>(AuthService).toSelf();
container.bind<AuthController>(AuthController).toSelf();

container.bind<UserService>(UserService).toSelf();
container.bind<UserController>(UserController).toSelf();

export default container;