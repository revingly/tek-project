const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const Schema = mongoose.Schema;

const tagSchema = new Schema({
	_id: {
		type: String,
		required: 'please supply a name',
		trim: true,
    unique: true
	},
	createdAt: {
		type: Date,
		default: Date.now
	}
});



module.exports = mongoose.model('Tag', tagSchema);