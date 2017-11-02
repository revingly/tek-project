const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const Schema = mongoose.Schema;

const tagSchema = new Schema({
	name: {
		type: String,
		required: 'please supply a name',
		trim: true
	},
	createdAt: Date
});



module.exports = mongoose.model('Tag', tagSchema);