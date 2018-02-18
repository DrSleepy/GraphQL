import UserModel from '../../models/User';
import registerSchema from './schema';
import { signToken } from '../../jwt';
import { SECURE_COOKIES } from '../../config';

export default async (args, context) => {
  const registerResponse = { ok: false, errors: [], user: null };

  // validate input
  const result = registerSchema(args.registerDetails);
  if (result.error) {
    registerResponse.errors = result.error.details; // eslint-disable-line
    return registerResponse;
  }

  // validated input
  const { email } = result.value;

  // check if user exists
  const userExists = await UserModel.findOne({ email });
  if (userExists) {
    registerResponse.errors.push({ path: ['email'], message: 'Email is already registered' });
    return registerResponse;
  }

  // add new user
  let newUser;
  await new UserModel(result.value)
    .save()
    .then(user => {
      newUser = user;
    })
    .catch(error => console.log(error));

  // assign user json web token
  const token = await signToken(newUser);

  // add token to response cookie
  context.res.cookie('token', token, { httpOnly: true, secure: SECURE_COOKIES });

  return { ok: true, errors: [], user: newUser };
};
