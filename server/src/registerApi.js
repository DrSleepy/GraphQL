import { makeExecutableSchema } from 'graphql-tools';
import merge from 'lodash/merge';

import ResolutionSchema from './api/resolution/resolutionSchema.graphql';
import ResolutionResolver from './api/resolution/resolvers';

const testSchema = `
  type Query {
    hi: String
    allData: [Customer]
  }

  type Customer {
    name: String!
    age: Int!
    gender: String!
  }
`;

const typeDefs = [testSchema, ResolutionSchema];

const testResolver = {
  Query: {
    hi: () => 'heey'
  }
};

const resolvers = merge(testResolver, ResolutionResolver);

export default makeExecutableSchema({ typeDefs, resolvers });
