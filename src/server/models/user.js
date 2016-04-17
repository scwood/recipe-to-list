import mongoose from 'mongoose';
import { compareSync, hashSync } from 'bcrypt-nodejs';

const UserSchema = new mongoose.Schema({
  email: String,
  name: String,
  password: String,
  recipes: [String],
  shoppingList: [Object],
});

function hashPassword(next) {
  if (!this.isModified('password')) {
    return next();
  }
  this.password = hashSync(this.password);
  return next();
}

UserSchema.pre('save', hashPassword);

UserSchema.methods.comparePassword = (password) => compareSync(password, this.password);

export default mongoose.model('User', UserSchema);
