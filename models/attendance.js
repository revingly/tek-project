const mongoose = require('mongoose');
mongoose.Promise = global.Promise
const Schema = mongoose.Schema;

const attendanceSchema = new Schema({
  date: Date
});

module.exports = mongoose.model('Attendace', attendanceSchema);