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
		type: String,
		ref: 'Tag',
		required: 'please supply a tag'
	}],
	createdAt: Date
},
	{
  toJSON:{ virtual: true},
  toObject: {virtual: true}
});

postSchema.virtual('comments', {
	ref: 'Comment', // model to link to
	localField: '_id', // id of the post
	foreignField: 'post' // field name of the post field in the review model
});


function autoPopulate(next){
	this.populate('author comments');
	next();
};

postSchema.pre('find', autoPopulate);
postSchema.pre('findOne', autoPopulate);

module.exports = mongoose.model('Post', postSchema);