import { Elysia, t } from 'elysia';
import { swagger } from '@elysiajs/swagger';
import { jwt } from '@elysiajs/jwt';
import AuthService from './services/auth.service';
import { AuthLoginBody, AuthRegisterBody, JwtData } from './types/auth';
import config from './config/jwt.config';
import HttpError from './exceptions/http.error';
import MoodService, {
  CreateMoodData,
  GetMoodParams,
} from './services/mood.service';
import { getJwtToken } from './libraries/token.library';

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
  .group('/moods', (app) =>
    app
      .get(
        '/',
        async ({ params, jwt, headers }) => {
          const paramData = params as Partial<GetMoodParams>;
          const jwtToken = getJwtToken(headers.Authorization);
          const user = (await jwt.verify(jwtToken)) as unknown as JwtData;

          const moods = await new MoodService().getMoods(user.id, paramData);
          return { moods };
        },
        {
          params: t.Object({
            skip: t.Optional(t.Number()),
            take: t.Optional(t.Number()),
          }),
        }
      )
      .post(
        '/',
        async ({ body, jwt, headers }) => {
          const bodyData = body as CreateMoodData;
          const jwtToken = getJwtToken(headers.Authorization);
          const user = (await jwt.verify(jwtToken)) as unknown as JwtData;

          const moods = await new MoodService().createMoodRecord(
            user.id,
            bodyData
          );
          return { moods };
        },
        {
          body: t.Object({
            level: t.Number(),
            content: t.String(),
          }),
        }
      )
  )
  .listen(3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
