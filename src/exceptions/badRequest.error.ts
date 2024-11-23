import ApiError from './api.error';

/**
 * BadRequestError class
 */
export default class BadRequestError extends ApiError {
  constructor(message: string) {
    super(message, 400);
  }
}