import UserModel from '../../models/User';
import PreferenceModel from '../../models/Preference';

export default async (args, context) => {
  const user = await UserModel.findById(context.userId);
  return PreferenceModel.findById(user.preferences);
};
