import type { FastifyServerOptions } from 'fastify';
import { fastifyApolloDrainPlugin, fastifyApolloHandler } from '@as-integrations/fastify';
import jwt from '@fastify/jwt';
import cors from '@fastify/cors';
import { fastify } from 'fastify';
import {
  constraintDirective,
  constraintDirectiveTypeDefs,
} from 'graphql-constraint-directive';
import { ApolloServer } from '@apollo/server';
import { makeExecutableSchema } from '@graphql-tools/schema';
import {
  AuthContext,
  GraphQLObjectID,
  mutationResolver,
  queryResolver,
  typeDefs,
} from './graphql';
import { Database } from './database';
import { authRouter } from './router/auth.router';

const initServer = async (opts?: FastifyServerOptions) => {
  const app = fastify(opts);

  const schema = constraintDirective()(
    makeExecutableSchema({
      typeDefs: [constraintDirectiveTypeDefs, typeDefs],
      resolvers: {
        ObjectID: GraphQLObjectID,
        Query: queryResolver,
        Mutation: mutationResolver,
      },
    }),
  );

  const apollo = new ApolloServer({
    schema,
    introspection: import.meta.env.DEV,
    includeStacktraceInErrorResponses: import.meta.env.DEV,
    plugins: [fastifyApolloDrainPlugin(app)],
  });

  await apollo.start();
  await Database.connect();

  app.register(cors, {
    origin: '*',
  });

  app.register(jwt, {
    secret: import.meta.env.VITE_JWT_SECRET,
  });

  app.register(authRouter);

  app.post(
    '/graphql',
    fastifyApolloHandler(apollo, {
      context: AuthContext,
    }),
  );

  if (import.meta.env.PROD) {
    try {
      app.listen({ port: 6543 });
      console.log('Listening on port', 6543);
    } catch (e) {
      console.error(e);
      process.exit(1);
    }
  } else {
    app.get('/api', fastifyApolloHandler(apollo));
  }

  return app;
};

export const viteNodeApp = initServer();
