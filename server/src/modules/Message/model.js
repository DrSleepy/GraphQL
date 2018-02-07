import mongoose, { Schema } from 'mongoose';

const MessageSchema = new Schema({
  user: {
    type: Schema.ObjectId,
    ref: 'User'
  },
  date: {
    type: Date,
    default: Date.now,
    set: () => Date.now
  },
  text: String
});

export default mongoose.model('Message', MessageSchema);
