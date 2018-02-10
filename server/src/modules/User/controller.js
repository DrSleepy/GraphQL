// THIS IS WHERE ACTUAL USER METHODS LIVE. CONTROLLER CALLS VALIDATION folder to validate data.
// File within validation folder returns if passed data is valid

// ALL function in return directly to GRAPHQL calls

import UserModel from './model';
import createNewUserValidation from './validation/createNewUser';

export const createNewUser = (root, args) => {
  // sanitise and validate input
  const result = createNewUserValidation(args);

  // return if any errors
  if (result.error) {
    return result.error;
  }

  // return added user to GRAPHQL MUTATION
  return new UserModel(result.value).save();
};

export const getAllUsers = () =>
  // perform authentication here if needed
  // return all users to GRAPHQL QUERY
  UserModel.findAll({});
