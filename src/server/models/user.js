import mongoose from 'mongoose';
import { compareSync, hashSync } from 'bcrypt-nodejs';

function hashPasswordIfModified(next) {
  if (!this.isModified('password')) {
    return next();
  }
  this.password = hashSync(this.password);
  return next();
}

function comparePassword(password) {
  return compareSync(password, this.password);
}

const UserSchema = new mongoose.Schema({
  email: String,
  name: String,
  password: String,
  recipes: [String],
  shoppingList: [Object],
});

UserSchema.pre('save', hashPasswordIfModified);
UserSchema.methods.comparePassword = comparePassword;

export default mongoose.model('User', UserSchema);
