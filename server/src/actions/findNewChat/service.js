import UserModel from '../../models/User';
import ChatlistModel from '../../models/Chatlist';
import BlocklistModel from '../../models/Blocklist';
import PreferenceModel from '../../models/Preference';
import PrivateChatModel from '../../models/PrivateChat';

export default async (args, context) => {
  const currentUser = await UserModel.findById({
    _id: context.userId
  }).populate('preferences');

  console.log(currentUser);
  console.log('------------------------------------');

  let blocklist = BlocklistModel.findById(currentUser.blocklist);
  let preferences = PreferenceModel.findById(currentUser.preferences);
  const promises = [blocklist, preferences];
  [blocklist, preferences] = await Promise.all([...promises]);

  const strangers = await UserModel.find({
    _id: { $ne: currentUser.id, $nin: blocklist.users },
    age: { $gte: currentUser.preferences.minAge, $lte: currentUser.preferences.maxAge }
    // gender: { $in: currentUser.preferences.gender }
  }).populate('preferences');

  console.log(strangers);

  const results = strangers.filter(stranger => {
    const minAge = stranger.preferences.minAge <= currentUser.age;
    const maxAge = stranger.preferences.maxAge >= currentUser.age;
    let gender = false;

    if (
      stranger.preferences.gender === 'both' ||
      stranger.preferences.gender === currentUser.preferences.gender
    ) {
      gender = true;
    }

    return minAge && maxAge && gender;
  });

  console.log(results);
  // const stranger = await UserModel.findById({
  //   _id: '5a8b18c1d4922903801bc2f5'
  // });

  // // create new private chatroom
  // const newPrivateChat = { user1: currentUser.id, user2: stranger.id };

  // let savedNewPrivateChat = await new PrivateChatModel(newPrivateChat).save();
  // // Don't refetch model. Used already fetched model
  // savedNewPrivateChat = await PrivateChatModel.findById(savedNewPrivateChat.id).populate([
  //   'user1',
  //   'user2'
  // ]);

  // // push private chat room to both users
  // await ChatlistModel.update(
  //   { _id: { $in: [currentUser.chatlist, stranger.chatlist] } },
  //   { $push: { privateChats: savedNewPrivateChat.id } },
  //   { multi: true }
  // );

  // return savedNewPrivateChat;
};
