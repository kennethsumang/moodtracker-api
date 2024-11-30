import ApiError from './api.error';

/**
 * NotFoundError class
 */
export default class NotFoundError extends ApiError {
  constructor(message: string) {
    super(message, 404);
  }
}