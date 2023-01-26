import type { User } from '../database/types';
import { ApolloFastifyContextFunction } from '@as-integrations/fastify';
import { GraphQLError } from 'graphql';
import { UserController } from '../controllers';

type Context = ApolloFastifyContextFunction<{
  user: User;
}>;

export const AuthContext: Context = async (req, rep) => {
  try {
    const token = await req.jwtVerify();
    const user = await UserController.getUser({ _id: token['payload'] });
    return {
      user: user,
    };
  } catch {
    throw new GraphQLError('User is not authenticated', {
      extensions: {
        code: 'UNAUTHENTICATED',
        http: { status: 401 },
      },
    });
  }
};
