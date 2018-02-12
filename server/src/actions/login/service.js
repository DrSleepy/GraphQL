import UserModel from '../../models/User';
import loginSchema from './schema';
import { signToken } from '../../jwt';

export default async (args, context) => {
  // bad response skeleton
  let loginResponse = {
    ok: false,
    errors: [],
    user: null,
    token: null
  };

  // validate input
  const result = loginSchema(args.loginDetails);
  if (result.error) {
    loginResponse.errors = result.error.details; // eslint-disable-line
    return loginResponse;
  }

  // validated input
  const { email, password } = result.value;

  // check if user exists
  const user = await UserModel.findOne({ email });
  if (!user) {
    // errors must be of formatted like Joi error: { path: [], message: '' }
    loginResponse.errors.push({ path: ['email'], message: 'Email is not registered' });
    return loginResponse;
  }

  // validate password
  const validPassword = user.comparePassword(password, user.password);
  if (!validPassword) {
    loginResponse.errors.push({ path: ['password'], message: 'Incorrect password' });
    return loginResponse;
  }

  // assign user json web token
  const token = signToken(user);

  // formulate good response
  loginResponse = {
    ok: true,
    errors: [],
    user,
    token
  };

  return loginResponse;
};
