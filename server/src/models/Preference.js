/* eslint func-names: 0 */
/* eslint space-before-function-paren: 0 */

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
  gender: [
    {
      type: String,
      required: true
    }
  ]
});

PreferenceSchema.pre('save', function(next) {
  if (this.isNew) {
    this.gender.push('female');
  }
  next();
});

export default mongoose.model('Preference', PreferenceSchema);
