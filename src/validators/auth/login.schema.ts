import { object, Schema, string } from 'yup';

const schema: Schema = object({
  email: string().email().required(),
  password: string().required(),
});

export { schema };