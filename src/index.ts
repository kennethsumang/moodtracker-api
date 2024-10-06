import { Elysia, t } from 'elysia';
import { swagger } from '@elysiajs/swagger';
import AuthService from './services/auth.service';
import { AuthLoginBody, AuthRegisterBody } from './types/auth';

const app = new Elysia()
  .use(swagger())
  .get('/', () => 'Hello Elysia')
  .group('/auth', (app) =>
    app
      .post(
        '/login',
        ({ body }) => {
          const { email, password } = body as AuthLoginBody;
          return new AuthService().attemptLogin(email, password);
        },
        {
          body: t.Object({ email: t.String(), password: t.String() }),
          detail: {
            summary: 'Sign in the user',
            tags: ['authentication'],
          },
        }
      )
      .post(
        '/register',
        ({ body }) => {
          return new AuthService().register(body as AuthRegisterBody);
        },
        {
          body: t.Object({
            name: t.String(),
            email: t.String(),
            password: t.String(),
            retypePassword: t.String(),
          }),
          detail: {
            summary: 'Registers a user',
            tags: ['authentication'],
          },
        }
      )
  )
  .listen(3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
