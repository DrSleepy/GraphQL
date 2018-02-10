// 'args' parameter in functions is values used in GraphQL mutation
// All functions return directly to GraphQL query/mutation

import UserModel from './model';
import createNewUserValidation from './validation/createNewUser';
import loginValidation from './validation/login';

// All GraphQL Queries
export const getAllUsers = () => UserModel.find({});

// All GraphQL Mutations
export const createNewUser = (root, args) => {
  const result = createNewUserValidation(args); // validate user input
  if (result.error) return result.error; // return error if exist
  return new UserModel(result.value).save(); // return saved user
};

export const login = async (root, args) => {
  const result = loginValidation(args);
  if (result.error) return result.error;

  const { email, password } = result.value;
  const user = await UserModel.findOne({ email });

  if (!user) return false;
  return user.comparePassword(password, user.password); // boolean
};
