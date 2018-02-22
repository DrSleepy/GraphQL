import { Schema } from 'mongoose';

const MessageSchema = new Schema({
  time: {
    type: String,
    default: 'Time here...'
  },
  text: {
    type: String,
    default: 'Text here...'
  },
  userId: {
    type: String,
    required: true
  }
});

export default MessageSchema;
