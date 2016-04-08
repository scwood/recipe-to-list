import mongoose from 'mongoose';
import passportLocalMongoose from 'passport-local-mongoose';

const User = new mongoose.Schema({
  username: String,
  recipes: [String],
  shoppingList: [Object],
});

User.plugin(passportLocalMongoose); // handles passwords and hashing

export default mongoose.model('User', User);
