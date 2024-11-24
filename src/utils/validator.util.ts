import { Schema, ValidationError } from 'yup';
import BadRequestError from '../exceptions/badRequest.error';
import ServerError from '../exceptions/server.error';

/**
 * Validates the data based on Yup schema.
 * @param {unknown} data
 * @param {Schema}  schema
 */
const validate = async<T>(data: unknown, schema: Schema) => {
  try {
    await schema.validate(data);
    return data as T;
  } catch (e) {
    if (e instanceof ValidationError) {
      throw new BadRequestError(e.errors.join('. '));
    }

    throw new ServerError((e as Error).message);
  }
};

export { validate };