import { Request, Response } from 'express';
import AuthService from '../services/auth.service';
import { inject, injectable } from 'inversify';
import { validate } from '../utils/validator.util';
import LoginDto from '../dtos/auth/login.dto';
import { schema as loginSchema } from '../validators/auth/login.schema';
import { schema as registerSchema } from '../validators/auth/register.schema';
import RegisterDto from '../dtos/auth/register.dto';

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
    const formData = await validate<RegisterDto>(req.body, registerSchema);
    return this.authService.register(formData);
  }

  async logout(req: Request, res: Response) {
    return this.authService.logout();
  }

  async refreshToken(req: Request, res: Response) {
    return this.authService.refreshToken();
  }
}