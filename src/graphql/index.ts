import { IEvent, IUser } from '../database/models';
export { AuthContext } from './context';
export { typeDefs } from './typedefs';
export { GraphQLObjectID } from './scalars';
export { mutationResolver, queryResolver } from './resolvers';

export type WithId = {
  id: string;
};

export type WithEvent = {
  input: IEvent;
};

export type WithUser = {
  user: IUser;
};
