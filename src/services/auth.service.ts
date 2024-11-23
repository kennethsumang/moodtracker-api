import LoginDto from '../dtos/auth/login.dto';
import RegisterDto from '../dtos/auth/register.dto';
import AuthRepository from '../repositories/auth.repository';
import { inject, injectable } from 'inversify';

/**
 * AuthService class
 */
@injectable()
export default class AuthService {
  constructor(@inject(AuthRepository) private authRepository: AuthRepository) {}

  async login(credentials: LoginDto) {
    return {};
  }

  async register(data: RegisterDto) {
    return {};
  }

  async refreshToken() {
    return {};
  }

  async logout() {
    return {};
  }
}