const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const Schema = mongoose.Schema;

const classeSchema = new Schema({
  name: {
    type: String,
    required: 'please enter a classe name'
  },
  user: [
    {
      type: mongoose.Schema.ObjectId,
      ref: 'User'
    }
  ],
  department: {
    type: String,
    ref: 'Department',
    required: true
  }

});

classeSchema.statics.getClassesByTeacher = function(){
  return this.aggregate([
    {$unwind: '$user'}
  ]);
}

module.exports = mongoose.model('Classe', classeSchema);