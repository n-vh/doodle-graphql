import type { FastifyPluginCallback, FastifyRequest } from 'fastify';
import { UserController } from '../controllers';
import S from 'fluent-json-schema';

type AuthRequestPayload = FastifyRequest<{
  Body: {
    email: string;
    password: string;
  };
}>;

const AuthValidation = {
  schema: {
    body: S.object()
      .prop('email', S.string().format(S.FORMATS.EMAIL).required())
      .prop('password', S.string().required().minLength(3)),
  },
};

export const authRouter: FastifyPluginCallback = (app, opts, next) => {
  app.post('/signup', AuthValidation, async (req: AuthRequestPayload, rep) => {
    try {
      const user = await UserController.createUser(req.body);
      const token = app.jwt.sign({ payload: user._id });
      rep.send({ token });
    } catch (e) {
      rep.status(401).send({
        status: 401,
        error: e.message,
      });
    }
  });

  app.post('/signin', AuthValidation, async (req: AuthRequestPayload, rep) => {
    try {
      const user = await UserController.getUser({ email: req.body.email });
      const token = app.jwt.sign({ payload: user._id });

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
