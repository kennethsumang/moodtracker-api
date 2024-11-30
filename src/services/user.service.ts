import { inject, injectable } from 'inversify';
import UserRepository from '../repositories/user.repository';
import NotFoundError from '../exceptions/notFound.error';
import _ from 'lodash';

@injectable()
export default class UserService {
  constructor(@inject(UserRepository) private userRepository: UserRepository) {}

  async getCurrentUser(id: string) {
    const user = await this.userRepository.getUserById(id);
    if (!user) {
      throw new NotFoundError('User not found');
    }

    return _.omit(user, ['password']);
  }
}