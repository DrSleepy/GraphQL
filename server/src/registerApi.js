import { makeExecutableSchema } from 'graphql-tools';

import ResolutionSchema from './graphql/resolution/resolutionSchema.graphql';
import ResolutionResolver from './graphql/resolution/resolvers';

import UserSchema from './graphql/user/resolutionSchema.graphql';
import { userMutations, userQueries } from './graphql/user/resolvers';

import User2Schema from './graphql/user2/resolutionSchema.graphql';
import user2Mutations from './graphql/user2/mutations';
import user2Queries from './graphql/user2/queries';

const typeDefs = [User2Schema, UserSchema];

// const resolvers = merge(ResolutionResolver, UserResolver);
// const resolvers = {
//   ...userQueries,
//   ...userMutations,
//   ...user2Mutations,
//   ...user2Queries
// };
const resolvers = {
  Query: {
    ...userQueries,
    ...user2Queries
  },

  Mutation: {
    ...userMutations,
    ...user2Mutations
  }
};
console.log(resolvers);

export default makeExecutableSchema({ typeDefs, resolvers });

// { Query: { allData: [Function: allData] },
// Mutation: { addData: [Function: addData] } }
