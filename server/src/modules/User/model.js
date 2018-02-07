import mongoose, { Schema } from 'mongoose';

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

// Schema can have plugins
// Schema have pre.('save') methods (use it to hash pass)
// When schema is accessed, it is possibl to check if a field is being modified like so:
// this.isModified('displayName')

export default mongoose.model('User', UserSchema);
