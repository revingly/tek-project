const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const Schema = mongoose.Schema;

const departmentSchema = new Schema({
  name: {
    type: String,
    required: 'please enter a department name',
    lowercase: true
  },
  chef_department: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: 'please add the chef of department'
  }

},{
  toJSON:{ virtual: true},
  toObject: {virtual: true}
});

departmentSchema.virtual('classes', {
  ref: 'Classe',
  localField: '_id',
  foreignField: 'department'
});

departmentSchema.virtual('subjects', {
  ref: 'Subject',
  localField: '_id',
  foreignField: 'department'
});


function autoPopulate(next){
	this.populate('classes subjects');
	next();
};

departmentSchema.pre('find', autoPopulate);
departmentSchema.pre('findOne', autoPopulate);
departmentSchema.pre('findById', autoPopulate);

module.exports = mongoose.model('Department', departmentSchema);