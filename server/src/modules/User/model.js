/* eslint func-names: 0 */
/* eslint space-before-function-paren: 0 */

import mongoose, { Schema } from 'mongoose';
import uniqueValidator from 'mongoose-unique-validator';
import { genSaltSync, hashSync, compareSync } from 'bcrypt';

const UserSchema = new Schema({
  displayName: {
    type: String,
    required: true
  },
  age: {
    type: Number,
    required: true
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
  chatlist: {
    type: Schema.ObjectId,
    ref: 'Chatlist'
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
