const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const Schema = mongoose.Schema;

const courseSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  created: {
    type: Date,
    default: Date.now
  },
  instructor: {
    type: mongoose.Schema.ObjectId,
    required: true
  },
  available: String
});

module.exports = mongoose.model('Course', courseSchema);