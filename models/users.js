const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const Schema = mongoose.Schema;
const md5 = require('md5');
const validator = require('validator');
const mongodbErrorHandler = require('mongoose-mongodb-errors');
const passportLocalMongoose = require('passport-local-mongoose');

const userSchema = new Schema({
	email: {
		type: String,
    unique: true,
    lowercase: true,
    trim: true,
    validate: [validator.isEmail, 'Invalid Email Address'],
    required: 'Please Supply an email address'
	},
	name: {
		type: String,
		required: 'please supply a name',
		trim: true,
		unique: true,
		lowercase: true
	},
  tags: [
  {type: String, ref: 'Tag'}
  ],
  status: {
    type: String,
    default: 'active'
  },
  points: {
    type: Number,
    default: 1
  },
  likes: [
    { type: mongoose.Schema.ObjectId, ref: 'Post'}
  ],

  resetPasswordToken: String,
  resetPasswordExpires: Date,
  apikey: String
});

userSchema.plugin(passportLocalMongoose, { usernameField: 'email' });
userSchema.plugin(mongodbErrorHandler);

module.exports = mongoose.model('User', userSchema);