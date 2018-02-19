import UserModel from '../../models/User';
import ChatlistModel from '../../models/Chatlist';
import BlocklistModel from '../../models/Blocklist';
import PreferenceModel from '../../models/Preference';
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

  // create new user
  let newChatlist = new ChatlistModel().save();
  let newBlocklist = new BlocklistModel().save();
  let newPreferences = new PreferenceModel().save();
  const promises = [newChatlist, newBlocklist, newPreferences];
  [newChatlist, newBlocklist, newPreferences] = await Promise.all([...promises]);

  const newUser = {
    ...result.value,
    chatlist: newChatlist.id,
    blocklist: newBlocklist.id,
    preferences: newPreferences.id
  };

  const savedNewUser = await new UserModel(newUser).save();

  // create and set jwt
  const token = await signToken(savedNewUser);
  context.res.cookie('token', token, { httpOnly: true, secure: SECURE_COOKIES });

  return { ok: true, errors: [], user: savedNewUser };
};
