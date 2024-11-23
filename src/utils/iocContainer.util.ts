import { Container } from 'inversify';
import AuthService from '../services/auth.service';
import AuthController from '../controllers/auth.controller';
import AuthRepository from '../repositories/auth.repository';

const container = new Container();

container.bind<AuthRepository>(AuthRepository).toSelf();
container.bind<AuthService>(AuthService).toSelf();
container.bind<AuthController>(AuthController).toSelf();

export default container;