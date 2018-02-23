// File imports methods from actions/service (which is the business logic)

// 'args' parameter in functions is values used in GraphQL mutation
// All functions return directly to GraphQL query/mutation

import myProfileService from '../actions/myProfile/service';
import registerService from '../actions/register/service';
import loginService from '../actions/login/service';
import logoutService from '../actions/logout/service';
import findNewStrangerService from '../actions/findNewStranger/service';
import updatePreferencesService from '../actions/updatePreferences/service';

export const allQueries = {
  myProfile: (root, args, context) => myProfileService(args, context),
  findNewStranger: (root, args, context) => findNewStrangerService(args, context)
};

export const allMutations = {
  register: (root, args, context) => registerService(args, context),
  login: (root, args, context) => loginService(args, context),
  logout: (root, args, context) => logoutService(args, context),
  updatePreferences: (root, args, context) => updatePreferencesService(args, context)
};
