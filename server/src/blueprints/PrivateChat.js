import mongoose, { Schema } from 'mongoose';

import MessageSchema from './Message';

const PrivateChatSchema = new Schema({
  user1: {
    type: Schema.ObjectId,
    ref: 'User'
  },
  user2: {
    type: Schema.ObjectId,
    ref: 'User'
  },
  messages: [MessageSchema]
});

export default mongoose.model('PrivateChat', PrivateChatSchema);
