// File imports methods from actions/service (which is the business logic)

// 'args' parameter in functions is values used in GraphQL mutation
// All functions return directly to GraphQL query/mutation

import myProfileService from '../actions/myProfile/service';
import registerService from '../actions/register/service';
import loginService from '../actions/login/service';
import logoutService from '../actions/logout/service';

// All GraphQL Queries
export const allQueries = {
  myProfile: (root, args, context) => myProfileService(context)
};

export const allMutations = {
  register: (root, args, context) => registerService(args, context),
  login: (root, args, context) => loginService(args, context),
  logout: (root, args, context) => logoutService(context)
};
