import NotFoundError from '../exceptions/not_found.error';
import MoodRepository from '../repositories/mood.repository';

export interface GetMoodParams {
  skip: number;
  take: number;
}

export interface CreateMoodData {
  datetime: Date;
  level: number;
  content: string;
}

/**
 * MoodService class
 */
export default class MoodService {
  moodRepository: MoodRepository;

  constructor() {
    this.moodRepository = new MoodRepository();
  }

  async getMoods(userId: string, params: Partial<GetMoodParams>) {
    params.skip = params.skip || 0;
    params.take = params.take || 10;

    return await this.moodRepository.getMoods(userId, params as GetMoodParams);
  }

  async createMoodRecord(userId: string, data: CreateMoodData) {
    return await this.moodRepository.createMood({ ...data, userId });
  }

  async updateMoodRecord(userId: string, moodId: string, data: CreateMoodData) {
    // check first if the mood record exists
    const currentMoodData = await this.moodRepository.getMoodFromIdAndUser(
      moodId,
      userId
    );
    if (currentMoodData.length !== 1) {
      throw new NotFoundError('Mood record does not exist.');
    }

    return await this.moodRepository.updateMood(currentMoodData[0].id, {
      ...data,
      userId,
    });
  }

  async deleteMoodRecord(userId: string, moodId: string) {
    // check first if the mood record exists
    const currentMoodData = await this.moodRepository.getMoodFromIdAndUser(
      moodId,
      userId
    );
    if (currentMoodData.length !== 1) {
      throw new NotFoundError('Mood record does not exist.');
    }

    return await this.moodRepository.deleteMood(currentMoodData[0].id);
  }
}
