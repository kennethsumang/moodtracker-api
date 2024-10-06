import HttpError from './http.error';

export default class DatabaseError extends HttpError {
  constructor(message: string) {
    super(500, message);
  }
}
