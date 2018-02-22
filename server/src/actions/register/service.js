import UserModel from '../../blueprints/User';
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
  const userExists = await UserModel.findOne({ email }).select('email');
  if (userExists) {
    registerResponse.errors.push({
      path: ['email'],
      message: 'Email is already registered'
    });
    return registerResponse;
  }

  const savedNewUser = await new UserModel(result.value).save();

  // create and set jwt
  const token = await signToken(savedNewUser);
  context.res.cookie('token', token, { httpOnly: true, secure: SECURE_COOKIES });

  return { ok: true, errors: [], user: savedNewUser };
};
