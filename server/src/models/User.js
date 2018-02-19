/* eslint func-names: 0 */
/* eslint space-before-function-paren: 0 */

import mongoose, { Schema } from 'mongoose';
import uniqueValidator from 'mongoose-unique-validator';
import { genSaltSync, hashSync, compareSync } from 'bcrypt';

const UserSchema = new Schema({
  displayName: {
    type: String,
    default: 'Anonymous'
  },
  age: {
    type: Number,
    default: 18
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  gender: {
    type: String,
    required: true
  },
  preferences: {
    type: Schema.ObjectId,
    ref: 'Preference'
  },
  chatlist: {
    type: Schema.ObjectId,
    ref: 'Chatlist'
  },
  blocklist: {
    type: Schema.ObjectId,
    ref: 'Blocklist'
  }
});

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
