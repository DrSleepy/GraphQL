/* eslint func-names: 0 */
/* eslint space-before-function-paren: 0 */

import mongoose, { Schema } from 'mongoose';
import uniqueValidator from 'mongoose-unique-validator';
import { genSaltSync, hashSync, compareSync } from 'bcrypt';

import PreferenceSchema from './Preference';

export const UserSchema = new Schema({
  displayName: {
    type: String,
    default: 'Anonymous'
  },
  age: {
    type: Number,
    default: 18,
    index: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    index: true
  },
  password: {
    type: String,
    required: true
  },
  gender: {
    type: String,
    required: true,
    index: true
  },
  preferences: {
    type: PreferenceSchema,
    default: PreferenceSchema
  },
  talkingTo: [String], // UserIDs
  privateChats: [String], // PrivateChatIDs
  blocklist: [String] // UserIDs
});

// indexes
UserSchema.index([
  { email: 1 },
  { gender: 1 },
  { age: 1 },
  { 'preferences.minAge': 1 },
  { 'preferences.maxAge': 1 },
  { 'preferences.gender': 1 }
]);

// plugins
UserSchema.plugin(uniqueValidator, {
  message: '{VALUE} already taken'
});

// hooks
UserSchema.pre('save', function(next) {
  if (this.isModified('password')) {
    this.password = this.encryptPassword(this.password);
  }
  next();
});

// methods
UserSchema.methods = {
  encryptPassword(password) {
    const salt = genSaltSync(10);
    return hashSync(password, salt);
  },
  comparePassword(plainPassword, hashedPassword) {
    return compareSync(plainPassword, hashedPassword);
  }
};

export default mongoose.model('User', UserSchema);
