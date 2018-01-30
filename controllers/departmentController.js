const mongoose = require('mongoose');
const Department = mongoose.model('Department');
const Classe = mongoose.model('Classe');
const Subject = mongoose.model('Subject');

//department crud
exports.getDepartments = async (req, res) => {
  const deps = await Department.find();
  res.render('admin/deps', {deps});
}

exports.createDepartment = async (req, res) => {
  const dep = new Department(req.body);
  dep.chef_department = req.user._id;
  await dep.save();
  res.redirect('back');
}

exports.editDepartment = async (req, res) => {
  const newData = req.body;
  await Department
    .findByIdAndUpdate(
      {_id: req.params.id},
      {$set: newData}
    );
  res.redirect('back');
}

exports.deleteDepartment = async (req, res) => {
  await Department
    .findByIdAndRemove(
      {_id: req.params.id}
    );
  res.redirect('back');
}

//other functions
exports.getDepartmentById = async (req, res) => {
  const dep = await Department.findById({_id: req.params.id}).populate('classes');
  res.render('admin/department', {dep});
}

exports.getDepartmentByName = async (req, res) => {
  const dep = await Department.findOne({name: `${req.params.name}`}).populate('classes');
  res.render('admin/department', {dep});
}