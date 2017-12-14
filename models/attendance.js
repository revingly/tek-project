const mongoose = require('mongoose');
mongoose.Promise = global.Promise
const Schema = mongoose.Schema;

const attendanceSchema = new Schema({
  date: {
    type: Date,
    default: Date.now,
    required: 'please enter a date'
  },
  teacher: {
    type: mongoose.Schema.ObjectId,
    red: 'User',
    required: 'please supply a teacher'
  },
  classe: {
    type: mongoose.Schema.ObjectId,
    red: 'Classe',
    required: 'please supply a classe'
  }

});

module.exports = mongoose.model('Attendace', attendanceSchema);