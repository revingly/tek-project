const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const Schema = mongoose.Schema;

const postSchema = new Schema({
	text: {
		type: String,
		required: 'please supply some text',
		trim: true
	},
	author: {
		type: mongoose.Schema.ObjectId,
		required: 'please supply an author',
		ref: 'User'
	},
	tags: [{
		type: mongoose.Schema.ObjectId,
		ref: 'Tag',
		required: 'please supply a tag'
	}],
	createdAt: Date
});


function autoPopulate(next){
	this.populate('author tags');
	next();
};

postSchema.pre('find', autoPopulate);
postSchema.pre('findOne', autoPopulate);

module.exports = mongoose.model('Post', postSchema);