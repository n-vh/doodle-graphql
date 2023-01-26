import type { FastifyPluginCallback } from 'fastify';
import {
  SignInRequestPayload,
  signInValidationSchema,
  SignUpRequestPayload,
  signUpValidationSchema,
} from './auth.schema';
import { UserController } from '../controllers';

export const authRouter: FastifyPluginCallback = (app, opts, next) => {
  app.post('/signup', signUpValidationSchema, async (req: SignUpRequestPayload, rep) => {
    try {
      const user = await UserController.createUser(req.body);
      const token = app.jwt.sign({ payload: user });
      rep.send({ token });
    } catch (e) {
      rep.status(401).send({
        status: 401,
        error: e.message,
      });
    }
  });

  app.post('/signin', signInValidationSchema, async (req: SignInRequestPayload, rep) => {
    try {
      const user = await UserController.getUser({ username: req.body.username });
      const token = app.jwt.sign({ payload: user });

      if (user.password !== req.body.password) {
        throw Error('INVALID_PASSWORD');
      }

      rep.send({ token });
    } catch (e) {
      rep.status(401).send({
        status: 401,
        error: e.message,
      });
    }
  });

  next();
};
