import UserModel from '../../models/User';
import PreferenceModel from '../../models/Preference';
import preferencesSchema from './schema';

export default async (args, context) => {
  const preferencesResponse = { ok: false, errors: [], preferences: null };

  const result = preferencesSchema(args.preferenceDetails);
  if (result.error) {
    preferencesResponse.errors = result.error.details; // eslint-disable-line
    return preferencesResponse;
  }

  let { minAge, maxAge, gender } = result.value; // eslint-disable-line

  const user = await UserModel.findById(context.userId);
  const updatedPreferences = await PreferenceModel.findByIdAndUpdate(
    user.preferences,
    { $set: { minAge, maxAge, gender } },
    { new: true }
  );

  return { ok: true, errors: [], preferences: updatedPreferences };
};
