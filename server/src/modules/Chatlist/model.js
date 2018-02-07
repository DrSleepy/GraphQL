import mongoose, { Schema } from 'mongoose';

const ChatlistSchema = new Schema({
  user: {
    type: Schema.ObjectId,
    ref: 'User'
  },
  privateChats: [
    {
      type: Schema.ObjectId,
      ref: 'PrivateChat'
    }
  ]
});

export default mongoose.model('Chatlist', ChatlistSchema);