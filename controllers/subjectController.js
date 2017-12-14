const mongoose = require('mongoose');
const Subject = mongoose.model('Subject');
const Department = mongoose.model('Department');

//subjects crud
exports.getSubjects = async (req, res) => {
  const subjects = await Subject.find();
  const deps = await Department.find();
  res.render('admin/subjects', {subjects, deps});
}

exports.createSubject = async (req, res) => {
  req.body.department = req.params.id;
  const subject = new Subject(req.body);
  await subject.save();
  res.redirect('back');
}

exports.editSubject = async (req, res) => {
  const newData = req.body;
  await Subject
    .findByIdAndUpdate(
      {_id: req.params.id},
      {$set: newData}
    );
  res.redirect('back');
}

exports.deleteSubject = async (req, res) => {
  await Subject
    .findByIdAndRemove(
      {_id: req.params.id}
    );
  res.redirect('back');
}