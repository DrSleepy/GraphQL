import { makeExecutableSchema } from 'graphql-tools';

import typeDefs from './typeDefs.graphql';
import { allQueries, allMutations } from '../actions/registerActions';

const resolvers = {
  Query: {
    ...allQueries
  },

  Mutation: {
    ...allMutations
  }
};

export default makeExecutableSchema({ typeDefs, resolvers });
