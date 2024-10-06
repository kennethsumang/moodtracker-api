import DatabaseError from '../exceptions/database.error';
import ValidationError from '../exceptions/validation.error';
import HashLibrary from '../libraries/hash.library';
import JwtLibrary from '../libraries/jwt.library';
import UserRepository from '../repositories/user.repository';
import { AuthRegisterBody } from '../types/auth';
import * as _ from 'lodash';

/**
 * AuthService class
 */
export default class AuthService {
  userRepository: UserRepository;

  constructor() {
    this.userRepository = new UserRepository();
  }

  async attemptLogin(email: string, password: string) {
    // get user by email
    const userWithSameEmail = await this.userRepository.getByEmail(email);
    if (userWithSameEmail.length === 0) {
      throw new ValidationError('Credentials do not match!');
    }

    const isValidPassword = await HashLibrary.compare(
      password,
      userWithSameEmail[0].password
    );
    if (!isValidPassword) {
      throw new ValidationError('Credentials do not match!');
    }

    const user = _.omit(userWithSameEmail[0], ['password']);
    const accessToken = await JwtLibrary.createNewToken(user);

    return { user, accessToken };
  }

  async register(data: AuthRegisterBody) {
    // check passwords
    if (data.password !== data.retypePassword) {
      throw new ValidationError('Passwords do not match!');
    }

    const userWithSameEmail = await this.userRepository.getByEmail(data.email);
    if (userWithSameEmail) {
      throw new ValidationError('Email is already taken!');
    }

    const { retypePassword, ...formData } = data;
    formData.password = await HashLibrary.hash(formData.password);

    const response = await this.userRepository.create(formData);
    if (response.length < 0) {
      throw new DatabaseError('Create user failed!');
    }

    // get new user data
    const newUser = await this.userRepository.getById(response[0].insertedId);
    return _.omit(newUser, ['password']);
  }
}
