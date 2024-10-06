import { eq } from 'drizzle-orm';
import { usersSchema } from '../../drizzle/schema';
import { db } from './client';
import { v4 as uuidv4 } from 'uuid';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';

interface UserFormData {
  name: string;
  email: string;
  password: string;
}

dayjs.extend(utc);

/**
 * UserRepository class
 */
export default class UserRepository {
  /**
   * Get the user with id
   * @param   {string} id
   * @returns
   */
  async getById(id: string) {
    return await db
      .select()
      .from(usersSchema)
      .where(eq(usersSchema.id, id))
      .limit(1);
  }

  /**
   * Gets the user with email
   * @param   {string} email
   * @returns
   */
  async getByEmail(email: string) {
    return await db
      .select()
      .from(usersSchema)
      .where(eq(usersSchema.email, email))
      .limit(1);
  }

  /**
   * Creates a new user
   * @param   {UserFormData} data
   * @returns
   */
  async create(data: UserFormData) {
    return await db
      .insert(usersSchema)
      .values({
        ...data,
        id: uuidv4(),
        createdAt: dayjs.utc().toDate(),
      })
      .returning({ insertedId: usersSchema.id });
  }
}
