import { GraphQLScalarType } from 'graphql';

const testObjectID = (value: string) => {
  const regex = /^[A-Fa-f0-9]{24}$/;
  if (!regex.test(value)) {
    throw new TypeError();
  }
  return value;
};

export const GraphQLObjectID = new GraphQLScalarType({
  name: 'ObjectID',
  serialize: testObjectID,
  parseValue: testObjectID,
});
