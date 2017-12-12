const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const Schema = mongoose.Schema;
const slug = require('slugs');

const bookSchema = new Schema({
  name: {
    type: String,
    required: "please enter a book name",
    trim: true,
  },
  slug: String,
  uuid: {
    type: Number,
    required: "please enter a book uuid",
  },
  author: {
    type: String,
    required: "please enter an author name"
  },
  numberOfCopies: {
    type: Number,
    required: "please enter the number of copies",
    default: 1
  },
  picture: String,
});

bookSchema.pre('save', function(next){
  if(!this.isModified('name')) return next();
  this.slug = slug(this.name);
  next();
});

module.exports = mongoose.model('Book', bookSchema);