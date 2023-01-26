import type { FastifyPluginCallback, FastifyRequest } from 'fastify';
import { UserController } from '../controllers';
import S from 'fluent-json-schema';

type PostAuthRequest = FastifyRequest<{
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
  // sign up route
  app.post('/signup', AuthValidation, async (req: PostAuthRequest, rep) => {
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

  // sign in route
  app.post('/signin', AuthValidation, async (req: PostAuthRequest, rep) => {
    try {
      const user = await UserController.getUser({ email: req.body.email });

      if (user.password !== req.body.password) {
        throw Error('Wrong Password');
      }

      const token = app.jwt.sign({ payload: user._id });

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
