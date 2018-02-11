import UserModel from '../../models/User';
import loginValidation from './validate';

export default async args => {
  // bad response skeleton
  const loginResponse = { ok: false, errors: null, user: null };

  // validate input
  const result = loginValidation(args.loginDetails);
  if (result.error) {
    loginResponse.errors = result.error.details[0]; // eslint-disable-line
    return loginResponse;
  }

  // validated input
  const { email, password } = result.value;

  // check if user exists
  const user = await UserModel.findOne({ email });
  if (!user) {
    // errors must be of formatted like Joi error: { path: [], message: '' }
    loginResponse.errors = { path: ['email'], message: 'Email is not registered' };
    return loginResponse;
  }

  // validate password
  const validPassword = user.comparePassword(password, user.password);
  if (!validPassword) {
    loginResponse.errors = { path: ['password'], message: 'Incorrect password' };
    return loginResponse;
  }

  // good response - return valid user
  return { ok: true, errors: null, user };
};
