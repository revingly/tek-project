const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const Schema = mongoose.Schema;

const messageSchema = new Schema({

	messageText: {
		type: String,
		trim: true,
		required: 'please supply a message'
	},
	createdAt: {
		type: Date,
		required: true,
		default: Date.now
	}
});

module.exports = mongoose.model('Message', messageSchema);