// File imports methods from actions/service (which is the business logic)

// 'args' parameter in functions is values used in GraphQL mutation
// All functions return directly to GraphQL query/mutation

import registerService from '../actions/register/service';
import loginService from '../actions/login/service';
import logoutService from '../actions/logout/service';
import myProfileService from '../actions/myProfile/service';

// All GraphQL Queries
export const myProfile = (root, args, context) => myProfileService(context);

// All GraphQL Mutations
export const register = (root, args, context) => registerService(args, context);

export const login = (root, args, context) => loginService(args, context);

export const logout = (root, args, context) => logoutService(context);
