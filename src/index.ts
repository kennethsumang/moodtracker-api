import { Elysia, t } from 'elysia';
import AuthService from './services/auth.service';
import { AuthLoginBody, AuthRegisterBody } from './types/auth';
import JwtLibrary from './libraries/jwt.library';

const app = new Elysia()
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
        }
      )
  )
  .listen(3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
