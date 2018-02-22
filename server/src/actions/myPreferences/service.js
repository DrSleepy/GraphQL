import UserModel from '../../blueprints/User';

export default async (args, context) => {
  const user = await UserModel.findById(context.userId).select([
    'preferences.minAge',
    'preferences.maxAge',
    'preferences.gender'
  ]);
  return user.preferences;
};
