import UserModel from '../../models/User';
import loginSchema from './schema';

export default async args => {
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
    // errors must be of formatted like Joi error: { path: [], message: '' }
    loginResponse.errors.push({ path: ['email'], message: 'email is not registered' });
    return loginResponse;
  }

  // validate password
  const validPassword = user.comparePassword(password, user.password);
  if (!validPassword) {
    loginResponse.errors.push({ path: ['password'], message: 'incorrect password' });
    return loginResponse;
  }

  // good response - return valid user
  return { ok: true, errors: [], user };
};
