import ChatlistModel from '../../models/Chatlist';
import UserModel from '../../models/User';
import PrivateChatModel from '../../models/PrivateChat';

// TO FIX IN QUERY: Add people already speaking to.
// Make Chatlist Model an array of userIDs like blocklist

export default async (args, context) => {
  const currentUser = await UserModel.findById(context.userId).populate([
    'preferences',
    'blocklist'
  ]);

  const strangers = await UserModel.find({
    _id: { $ne: currentUser.id, $nin: currentUser.blocklist.users },
    age: { $gte: currentUser.preferences.minAge, $lte: currentUser.preferences.maxAge },
    gender: { $in: currentUser.preferences.gender }
  }).populate(['preferences', 'blocklist']);

  const strangersResult = strangers.filter(stranger => {
    const inBlocklist = stranger.blocklist.users.includes(currentUser.id);
    const olderThanMinAge = stranger.preferences.minAge <= currentUser.age;
    const youngerThanMaxAge = stranger.preferences.maxAge >= currentUser.age;
    const inGender = stranger.preferences.gender.includes(currentUser.gender);
    return !inBlocklist && olderThanMinAge && youngerThanMaxAge && inGender;
  });

  const selectedStranger = strangersResult[0]; // fix later. make random

  const newPrivateChat = { user1: currentUser.id, user2: selectedStranger.id };

  let savedNewPrivateChat = await new PrivateChatModel(newPrivateChat).save();
  // DO NOT refetch same field twice. Find a way to return populated subdocuments on save
  savedNewPrivateChat = await PrivateChatModel.findById(savedNewPrivateChat.id).populate([
    'user1',
    'user2'
  ]);

  // push private chat room to both users
  await ChatlistModel.update(
    { _id: { $in: [currentUser.chatlist, selectedStranger.chatlist] } },
    { $push: { privateChats: savedNewPrivateChat.id } },
    { multi: true }
  );

  return savedNewPrivateChat;
};
