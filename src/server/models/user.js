import mongoose from 'mongoose';
import { hashSync } from 'bcrypt';

const userSchema = new mongoose.Schema({
  username: String,
  password: String,
  recipes: [String],
  shoppingList: [Object],
});

userSchema.statics.hashPassword = (password) => {
  const saltRounds = 10;
  return hashSync(password, saltRounds);
};

export default mongoose.model('User', userSchema);
