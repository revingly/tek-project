const mongoose = require('mongoose');
const Subject = mongoose.model('Subject');

//subjects crud
exports.getSubjects = async (req, res) => {
  const subjects = await Subject.find();
  res.render('admin/subjects', {subjects});
}

exports.createSubject = async (req, res) => {
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