import { inject, injectable } from 'inversify';
import { PrismaClient } from '@prisma/client';

/**
 * AuthRepository class
 */
@injectable()
export default class AuthRepository {
  constructor(@inject(PrismaClient) private prisma: PrismaClient) {}
}