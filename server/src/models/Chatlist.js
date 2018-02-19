import mongoose, { Schema } from 'mongoose';

const ChatlistSchema = new Schema({
  privateChats: [
    {
      type: Schema.ObjectId,
      ref: 'PrivateChats'
    }
  ]
});

export default mongoose.model('Chatlist', ChatlistSchema);
