import { settingsSchema } from '../../drizzle/schema';
import { db } from './client';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';

dayjs.extend(utc);

export default class SettingsRepository {
  async createDefaultSettingForUser(
    userId: string,
    timezone: string = 'Asia/Manila'
  ) {
    return await db
      .insert(settingsSchema)
      .values({ userId, timezone, createdAt: dayjs().utc().toDate() })
      .returning();
  }
}
