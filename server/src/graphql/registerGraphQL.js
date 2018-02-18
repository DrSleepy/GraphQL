import { makeExecutableSchema } from 'graphql-tools';

// Schema imports
import userSchema from './schemas/User.graphql';
import privateChatSchema from './schemas/PrivateChat.graphql';

import { allQueries, allMutations } from '../actions/registerActions';

// Schemas
const typeDefs = [userSchema, privateChatSchema];

// Queries and resolvers
const resolvers = {
  Query: {
    ...allQueries
  },

  Mutation: {
    ...allMutations
  }
};

export default makeExecutableSchema({ typeDefs, resolvers });
