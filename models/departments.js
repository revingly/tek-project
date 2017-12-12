const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const Schema = mongoose.Schema;

const departmentSchema = new Schema({
  name: {
    type: String,
    required: 'please enter a department name'
  },
  chef_department: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: 'please add the chef of department'
  },
  classes: [
    {
      type: mongoose.Schema.ObjectId,
      ref: 'Classe'
    }
  ],
  subjects: [
    {
      type: mongoose.Schema.ObjectId,
      ref: 'Subject'
    }
  ]
});

module.exports = mongoose.model('Department', departmentSchema);