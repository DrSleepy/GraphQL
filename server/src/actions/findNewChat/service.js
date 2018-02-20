import UserModel from '../../models/User';
import Chatlist from '../../models/Chatlist';
import PrivateChatModel from '../../models/PrivateChat';

export default async (args, context) => {
  const currentUser = await UserModel.findById({ _id: context.userId });
  const stranger = await UserModel.findById({ _id: '5a8b18c1d4922903801bc2f5' });

  // create new private chatroom
  const newPrivateChat = {
    user1: currentUser.id,
    user2: stranger.id
  };

  let savedNewPrivateChat = await new PrivateChatModel(newPrivateChat).save();
  // Don't refetch model. Used already fetched model
  savedNewPrivateChat = await PrivateChatModel.findById(savedNewPrivateChat.id).populate([
    'user1',
    'user2'
  ]);

  // push private chat room to both users
  await Chatlist.update(
    { _id: { $in: [currentUser.chatlist, stranger.chatlist] } },
    { $push: { privateChats: savedNewPrivateChat.id } },
    { multi: true }
  );

  return savedNewPrivateChat;
};
