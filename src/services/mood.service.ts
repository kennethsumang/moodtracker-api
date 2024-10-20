import MoodRepository from '../repositories/mood.repository';

export interface GetMoodParams {
  skip: number;
  take: number;
}

export interface CreateMoodData {
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
}
