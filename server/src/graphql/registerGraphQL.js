import { makeExecutableSchema } from 'graphql-tools';

// User
import userSchema from './user/schema.graphql';
import userQueries from './user/queries';
import userMutations from './user/mutations';

// Private Chat
import privateChatSchema from './privateChat/schema.graphql';
import privateChatQueries from './privateChat/queries';
import privateChatMutations from './privateChat/mutations';

// Schemas
const typeDefs = [userSchema, privateChatSchema];

// Queries and resolvers
const resolvers = {
  Query: {
    ...userQueries,
    ...privateChatQueries
  },

  Mutation: {
    ...userMutations,
    ...privateChatMutations
  }
};

export default makeExecutableSchema({ typeDefs, resolvers });
