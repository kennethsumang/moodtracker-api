import { Elysia, t } from 'elysia';
import { swagger } from '@elysiajs/swagger';
import { jwt } from '@elysiajs/jwt';
import AuthService from './services/auth.service';
import { AuthLoginBody, AuthRegisterBody } from './types/auth';
import config from './config/jwt.config';
import HttpError from './exceptions/http.error';

const app = new Elysia()
  .use(swagger())
  .use(
    jwt({
      name: 'jwt',
      secret: config.jwtSecret!,
    })
  )
  .onError(({ code, error }) => {
    return {
      status: error instanceof HttpError ? error.code : 500,
      message: error.message || 'Internal Server Error',
    };
  })
  .get('/', () => 'Hello Elysia')
  .group('/auth', (app) =>
    app
      .post(
        '/login',
        async ({ body, jwt }) => {
          const { email, password } = body as AuthLoginBody;
          const user = await new AuthService().attemptLogin(email, password);
          const accessToken = await jwt.sign(user);
          return { user, accessToken };
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
