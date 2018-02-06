import mongoose from 'mongoose';

const { Schema } = mongoose;

const PrivateChatSchema = new Schema({
  user1: {
    type: Schema.ObjectId,
    ref: 'User'
  },
  user2: {
    type: Schema.ObjectId,
    ref: 'User'
  },
  messages: [
    {
      type: Schema.ObjectId,
      ref: 'Message'
    }
  ]
});

export default mongoose.model('PrivateChat', PrivateChatSchema);
