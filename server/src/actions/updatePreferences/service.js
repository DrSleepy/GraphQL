import UserModel from '../../blueprints/User';
import preferencesSchema from './schema';

export default async (args, context) => {
  const preferencesResponse = { ok: false, errors: [], preferences: null };

  const result = preferencesSchema(args.preferenceDetails);
  if (result.error) {
    preferencesResponse.errors = result.error.details; // eslint-disable-line
    return preferencesResponse;
  }

  const { minAge, maxAge, gender } = result.value; // eslint-disable-line

  const user = await UserModel.findByIdAndUpdate(
    context.userId,
    {
      'preferences.minAge': minAge,
      'preferences.maxAge': maxAge,
      'preferences.gender': gender
    },
    { new: true }
  ).select(['preferences.minAge', 'preferences.maxAge', 'preferences.gender']);

  return { ok: true, errors: [], preferences: user.preferences };
};
