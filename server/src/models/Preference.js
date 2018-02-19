import mongoose, { Schema } from 'mongoose';

const PreferenceSchema = new Schema({
  minAge: {
    type: Number,
    required: true,
    default: 18
  },
  maxAge: {
    type: Number,
    required: true,
    default: 70
  },
  gender: {
    type: String,
    required: true,
    default: 'both'
  }
});

export default mongoose.model('Preference', PreferenceSchema);
