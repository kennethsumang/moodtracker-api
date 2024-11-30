import { Request, Response } from 'express';
import { inject, injectable } from 'inversify';
import UserService from '../services/user.service';

/**
 * UserController class
 */
@injectable()
export default class UserController {
  constructor(@inject(UserService) private userService: UserService) {}

  async getCurrentUser(request: Request, response: Response) {
    return this.userService.getCurrentUser(request.user!.id);
  }
}