import UserModel from '../../models/User';
import registerSchema from './schema';

export default async args => {
  const registerResponse = { ok: false, errors: null, user: null };

  // validate input
  const result = registerSchema(args.registerDetails);
  if (result.error) {
    registerResponse.errors = result.error.details[0]; // eslint-disable-line
    return registerResponse;
  }

  // validated input
  const { email, password, confirmPassword } = result.value;

  // check if user exists
  const userExists = await UserModel.findOne({ email });
  if (userExists) {
    registerResponse.errors = { path: ['email'], message: 'Email is already registered' };
    return registerResponse;
  }

  // matching password
  if (password !== confirmPassword) {
    registerResponse.errors = { path: ['confirmPassword'], message: 'Password does not match' };
    return registerResponse;
  }

  // add user
  let newUser;
  try {
    newUser = await new UserModel(result.value).save();
  } catch (error) {
    console.log(error);
  }

  return { ok: true, errors: null, user: newUser };
};
