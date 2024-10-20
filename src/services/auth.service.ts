import DatabaseError from '../exceptions/database.error';
import ValidationError from '../exceptions/validation.error';
import HashLibrary from '../libraries/hash.library';
import SettingsRepository from '../repositories/settings.repository';
import UserRepository from '../repositories/user.repository';
import { AuthRegisterBody } from '../types/auth';
import * as _ from 'lodash';

/**
 * AuthService class
 */
export default class AuthService {
  userRepository: UserRepository;
  settingsRepository: SettingsRepository;

  constructor() {
    this.userRepository = new UserRepository();
    this.settingsRepository = new SettingsRepository();
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

    return _.omit(userWithSameEmail[0], [
      'password',
      'createdAt',
      'emailVerifiedAt',
    ]);
  }

  async register(data: AuthRegisterBody) {
    // check passwords
    if (data.password !== data.retypePassword) {
      throw new ValidationError('Passwords do not match!');
    }

    const userWithSameEmail = await this.userRepository.getByEmail(data.email);
    if (userWithSameEmail.length > 0) {
      throw new ValidationError('Email is already taken!');
    }

    const { retypePassword, ...formData } = data;
    formData.password = await HashLibrary.hash(formData.password);

    const userInsertResponse = await this.userRepository.create(formData);
    if (userInsertResponse.length < 0) {
      throw new DatabaseError('Create user failed!');
    }

    // create settings record
    const newUser = userInsertResponse[0];
    const settingsInsertResponse =
      await this.settingsRepository.createDefaultSettingForUser(newUser.id);
    return _.omit({ ...newUser, settings: settingsInsertResponse[0] }, [
      'password',
    ]);
  }
}
