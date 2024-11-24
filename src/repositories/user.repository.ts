import { inject, injectable } from 'inversify';
import { PrismaClient, User } from '@prisma/client';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import RegisterDto from '../dtos/auth/register.dto';

dayjs.extend(utc);

/**
 * UserRepository class
 */
@injectable()
export default class UserRepository {
  constructor(@inject(PrismaClient) private prisma: PrismaClient) {}

  async getUserByEmail(email: string): Promise<User[]> {
    return this.prisma
      .user
      .findMany({
        where: { email: email },
      });
  }

  async createUser(form: RegisterDto): Promise<User> {
    return this.prisma
      .user
      .create({
        data: {
          ...form,
          passwordChangedAt: dayjs.utc().toDate(),
        }
      })
  }
}