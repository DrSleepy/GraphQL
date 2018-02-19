import mongoose, { Schema } from 'mongoose';

const BlocklistSchema = new Schema({
  users: [
    {
      type: Schema.ObjectId,
      ref: 'User'
    }
  ]
});

export default mongoose.model('Blocklist', BlocklistSchema);
