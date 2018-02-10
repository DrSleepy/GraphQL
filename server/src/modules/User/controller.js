// 'args' parameter in functions is values used in GraphQL mutation
// All functions return directly to GraphQL query/mutation

import UserModel from './model';
import createNewUserValidation from './validation/createNewUser';

// All GraphQL Queries
export const getAllUsers = () => UserModel.findAll({});

// All GraphQL Mutations
export const createNewUser = (root, args) => {
  const result = createNewUserValidation(args); // validate user input
  if (result.error) return result.error; // return error if exist
  return new UserModel(result.value).save(); // return saved user
};
