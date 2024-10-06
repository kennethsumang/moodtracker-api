import HttpError from './http.error';

export default class ValidationError extends HttpError {
  constructor(message: string) {
    super(400, message);
  }
}
