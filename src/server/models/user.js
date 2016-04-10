import _ from 'lodash';
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

userSchema.statics.reduceUser = (user) => {
  const values = ['username', 'recipes', 'shoppingList'];
  return _.pick(user, values);
};

export default mongoose.model('User', userSchema);
