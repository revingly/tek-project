const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const Schema = mongoose.Schema;

const classeSchema = new Schema({
  name: {
    type: String,
    required: 'please enter a classe name',
    lowercase: true
  },
  teacher: [
    {
      type: mongoose.Schema.ObjectId,
      ref: 'User'
  }],
  students: [{
    type: mongoose.Schema.ObjectId,
    ref: 'User'
  }]

});

classeSchema.statics.getClassesByTeacher = function(){
  return this.aggregate([
    {$unwind: '$user'},
    {$group: {_id: '$user', name: { $push: '$name'}}},
  ]);
}

module.exports = mongoose.model('Classe', classeSchema);