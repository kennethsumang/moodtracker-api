import { Request, Response } from 'express';
import AuthService from '../services/auth.service';
import { inject, injectable } from 'inversify';
import { validate } from '../utils/validator.util';
import LoginDto from '../dtos/auth/login.dto';
import { schema as loginSchema } from '../validators/auth/login.schema';

/**
 * AuthController class
 */
@injectable()
export default class AuthController {
  constructor(@inject(AuthService) private authService: AuthService) {}

  async login(req: Request, res: Response) {
    const credentials = await validate<LoginDto>(req.body, loginSchema);
    return this.authService.login(credentials);
  }

  async register(req: Request, res: Response) {
    return this.authService.register(req.body);
  }

  async logout(req: Request, res: Response) {
    return this.authService.logout();
  }

  async refreshToken(req: Request, res: Response) {
    return this.authService.refreshToken();
  }
}