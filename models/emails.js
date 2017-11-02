const mongoose = require('mongoose');
const Schema = mongoose.Schema;
mongoose.Promise = global.Promise;

const emailSchema = new Schema({
	created: {
		type: Date,
		required: true
	},
	choice: {
		type: String,
		required: 'you must supply a choice for email'
	},
	sender: {
		type: mongoose.Schema.ObjectId,
		ref: 'User',
		required: 'you must supply a sender'
	},
	content: {
		type: String,
		required: 'you must supply a message',
		trim: true
	}
});

module.exports = mongoose.model('Email', emailSchema);