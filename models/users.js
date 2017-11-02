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
		required: 'please supply an email',
		trim: true,
		unique: true,
		lowercase: true
	},
	name: {
		type: String,
		required: 'please supply a name',
		trim: true,
		unique: true,
		lowercase: true
	},
	resetPasswordToken: String,
  resetPasswordExpires: Date,
  tags: [
  {type: mongoose.Schema.ObjectId, ref: 'Tag'}
  ],
  roles: [{type: String}]

});

userSchema.plugin(passportLocalMongoose, { usernameField: 'email' });
userSchema.plugin(mongodbErrorHandler);

module.exports = mongoose.model('User', userSchema);