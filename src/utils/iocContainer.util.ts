import { Container } from 'inversify';
import { PrismaClient } from '@prisma/client';
import AuthService from '../services/auth.service';
import AuthController from '../controllers/auth.controller';
import UserRepository from '../repositories/user.repository';

const container = new Container();

container.bind<PrismaClient>(PrismaClient).toSelf().inSingletonScope();

container.bind<UserRepository>(UserRepository).toSelf();
container.bind<AuthService>(AuthService).toSelf();
container.bind<AuthController>(AuthController).toSelf();

export default container;