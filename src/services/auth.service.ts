import LoginDto from '../dtos/auth/login.dto';
import RegisterDto from '../dtos/auth/register.dto';
import UserRepository from '../repositories/user.repository';
import { inject, injectable } from 'inversify';
import BadRequestError from '../exceptions/badRequest.error';
import { hashSync, compareSync } from 'bcrypt';
import _ from 'lodash';
import UnauthorizedError from '../exceptions/unauthorized.error';
import { signJwt } from '../utils/jwt.util';

/**
 * AuthService class
 */
@injectable()
export default class AuthService {
  constructor(@inject(UserRepository) private userRepository: UserRepository) {}

  async login(credentials: LoginDto) {
    const usersWithSameEmail = await this.userRepository.getUserByEmail(credentials.email);
    if (!usersWithSameEmail) {
      throw new UnauthorizedError('Authentication failed');
    }

    const isCorrectPassword = compareSync(credentials.password, usersWithSameEmail[0].password);
    if (!isCorrectPassword) {
      throw new UnauthorizedError('Authentication failed');
    }

    const tokenData = _.pick(usersWithSameEmail[0], ['id', 'email', 'name']);
    const token = await signJwt(tokenData);
    return {
      user: tokenData,
      accessToken: token,
    };
  }

  async register(data: RegisterDto) {
    // check if email is unique
    const usersWithSameEmail = await this.userRepository.getUserByEmail(data.email);
    if (usersWithSameEmail.length > 0) {
      throw new BadRequestError('Email already exists');
    }

    // hash password
    data.password = hashSync(data.password, 8);
    const user = await this.userRepository.createUser(data);
    return _.pick(user, ['id', 'email', 'name']);
  }

  async refreshToken() {
    return {};
  }

  async logout() {
    return {};
  }
}