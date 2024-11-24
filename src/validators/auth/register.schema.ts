import { object, Schema, string } from 'yup';

const schema: Schema = object({
  name: string().required(),
  email: string().email().required(),
  password: string().required(),
});

export { schema };