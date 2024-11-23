import { Request, Response } from 'express';
import AuthService from '../services/auth.service';
import { inject, injectable } from 'inversify';

/**
 * AuthController class
 */
@injectable()
export default class AuthController {
  constructor(@inject(AuthService) private authService: AuthService) {}

  async login(req: Request, res: Response) {
    return this.authService.login(req.body);
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