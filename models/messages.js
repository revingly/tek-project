const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const Schema = mongoose.Schema;

const messageSchema = new Schema({
	author: {
		type: mongoose.Schema.ObjectId,
		ref: 'User',
		required: 'please supply user'
	},
	messageText: {
		type: String,
		trim: true,
		required: 'please supply a message'
	},
	createdAt: Date
});

module.exports = mongoose.model('Message', messageSchema);