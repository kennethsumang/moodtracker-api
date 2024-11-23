import ApiError from './api.error';

/**
 * UnauthorizedError class
 */
export default class UnauthorizedError extends ApiError {
  constructor(message: string) {
    super(message, 401);
  }
}