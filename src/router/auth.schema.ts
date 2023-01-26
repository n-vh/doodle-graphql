import type { FastifyRequest } from 'fastify';
import type { User } from '../database/types';
import S from 'fluent-json-schema';

export type SignUpRequestPayload = FastifyRequest<{
  Body: Omit<User, 'id'>;
}>;

export type SignInRequestPayload = FastifyRequest<{
  Body: Omit<User, 'id' | 'email'>;
}>;

export const signInValidationSchema = {
  schema: {
    body: S.object()
      .prop('username', S.string().minLength(3).maxLength(25).required())
      .prop('password', S.string().minLength(3).required()),
  },
};

export const signUpValidationSchema = {
  schema: {
    body: S.object()
      .prop('email', S.string().format(S.FORMATS.EMAIL).required())
      .extend(signInValidationSchema.schema.body),
  },
};
