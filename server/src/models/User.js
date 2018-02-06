import mongoose from 'mongoose';

const { Schema } = mongoose;

const UserSchema = new Schema({
  displayName: {
    type: String,
    required: true
  },
  age: {
    type: Number,
    required: true
  },
  chatlist: {
    type: Schema.ObjectId,
    ref: 'Chatlist'
  }
});

export default mongoose.model('User', UserSchema);
