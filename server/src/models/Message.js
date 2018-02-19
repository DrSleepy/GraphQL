import mongoose, { Schema } from 'mongoose';

const MessageSchema = new Schema({
  time: {
    type: String,
    default: 'Time here...'
  },
  text: {
    type: String,
    default: 'Text here...'
  },
  user: {
    type: Schema.ObjectId,
    ref: 'User'
  }
});

export default mongoose.model('Message', MessageSchema);
