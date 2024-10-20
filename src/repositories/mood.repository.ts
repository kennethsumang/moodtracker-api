import { eq } from 'drizzle-orm';
import { v4 as uuidv4 } from 'uuid';
import { moodsSchema } from '../../drizzle/schema';
import { GetMoodParams } from '../services/mood.service';
import { db } from './client';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';

dayjs.extend(utc);

export interface CreateMoodFormData {
  userId: string;
  level: number;
  content: string;
}

export default class MoodRepository {
  async getMoods(userId: string, params: GetMoodParams) {
    return db
      .select()
      .from(moodsSchema)
      .where(eq(moodsSchema.userId, userId))
      .limit(params.take)
      .offset(params.skip);
  }

  async createMood(data: CreateMoodFormData) {
    return db.insert(moodsSchema).values({
      ...data,
      id: uuidv4(),
      createdAt: dayjs().utc().toDate(),
    });
  }
}
