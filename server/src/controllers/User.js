// File imports methods from actions/service (which is the business logic)

// 'args' parameter in functions is values used in GraphQL mutation
// All functions return directly to GraphQL query/mutation

import loginService from '../actions/login/service';
import registerService from '../actions/register/service';

import UserModel from '../models/User';

// All GraphQL Queries
export const getAllUsers = () => UserModel.find({});

// All GraphQL Mutations
export const login = (root, args, context) => loginService(args, context);

export const register = (root, args) => registerService(args);
