const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const Schema = mongoose.Schema;

const subjectSchema = new Schema({
  name: {
    type: String,
    required: 'please enter a subject name'
  },
  hours: {
    type: Number,
    required: 'please enter subject hours',
  },
  absence: {
    type: Number,
    defauls: 0
  },
  user: [{
    type: mongoose.Schema.ObjectId,
    ref: 'User'
  }],
  department: [{
    type: String,
    ref: 'Department',
    required: true
  }]
});


module.exports = mongoose.model('Subject', subjectSchema);