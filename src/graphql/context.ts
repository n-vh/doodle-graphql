import { ApolloFastifyContextFunction } from '@as-integrations/fastify';
import { GraphQLError } from 'graphql';
import { IUser } from '../database/models';
import { UserController } from '../controllers';

type Context = ApolloFastifyContextFunction<{
  user: IUser;
}>;

export const AuthContext: Context = async (req, rep) => {
  try {
    const token = await req.jwtVerify();
    const owner = await UserController.getUser({ _id: token['payload'] });
    return {
      user: owner,
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
