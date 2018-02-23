import UserModel from '../../blueprints/User';
import loginSchema from './schema';
import { signToken } from '../../jwt';
import { SECURE_COOKIES } from '../../config';

export default async (args, context) => {
  // bad response skeleton
  const loginResponse = { ok: false, errors: [], user: null };

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
    // errors must be formatted like Joi error: { path: [], message: '' }
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
  const token = await signToken(user);

  // add token to response cookie
  context.res.cookie('token', token, { httpOnly: true, secure: SECURE_COOKIES });

  // formulate good response
  return { ok: true, errors: [], user };
};
