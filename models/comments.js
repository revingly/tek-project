const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const Schema = mongoose.Schema;

const commentSchema = new Schema({
  content: {
    type: String,
    trim: true,
    required: 'please write something'
  },
  post: {
    type: mongoose.Schema.ObjectId,
    ref: 'Post',
    required: 'you must supply a post id'
  },
  author: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: 'you must be logged in to comment'
  },
  created: {
    type: Date,
    default: Date.now
  }
});


function autoPopulate(next){
	this.populate('author', 'name');
	next();
};

commentSchema.pre('find', autoPopulate);
commentSchema.pre('findOne', autoPopulate);

module.exports = mongoose.model('Comment', commentSchema);