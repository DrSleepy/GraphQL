import { makeExecutableSchema } from 'graphql-tools';

// User
import userSchema from './graphql/user/schema.graphql';
import userQueries from './graphql/user/queries';
import userMutations from './graphql/user/mutations';

// Private Chat
import privateChatSchema from './graphql/privateChat/schema.graphql';
import privateChatQueries from './graphql/privateChat/queries';
import privateChatMutations from './graphql/privateChat/mutations';

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
