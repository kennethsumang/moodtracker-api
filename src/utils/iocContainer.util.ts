import { Container } from 'inversify';
import { PrismaClient } from '@prisma/client';
import AuthService from '../services/auth.service';
import AuthController from '../controllers/auth.controller';
import AuthRepository from '../repositories/auth.repository';

const container = new Container();

container.bind<PrismaClient>(PrismaClient).toSelf();

container.bind<AuthRepository>(AuthRepository).toSelf();
container.bind<AuthService>(AuthService).toSelf();
container.bind<AuthController>(AuthController).toSelf();

export default container;