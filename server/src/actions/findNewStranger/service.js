import UserModel from '../../blueprints/User';

export default async (args, context) => {
  const currentUser = await UserModel.findById(context.userId);

  const strangers = await UserModel.find({
    _id: { $ne: currentUser.id, $nin: currentUser.blocklist },
    blocklist: { $ne: currentUser.id },
    talkingTo: { $ne: currentUser.id },
    gender: { $in: currentUser.preferences.gender },
    age: { $gte: currentUser.preferences.minAge, $lte: currentUser.preferences.maxAge },
    'preferences.minAge': { $lte: currentUser.age },
    'preferences.maxAge': { $gte: currentUser.age },
    'preferences.gender': currentUser.gender
  }).select(['displayName', 'age', 'gender', 'blocklist', 'talkingTo']);

  const max = strangers.length;
  const rand = Math.floor(Math.random() * Math.floor(max));

  return strangers[rand];
};
