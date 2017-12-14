const mongoose = require('mongoose');
const Classe = mongoose.model('Classe');
const Department = mongoose.model('Department');
const User = mongoose.model('User');
// classes crud
exports.getClasses = async (req, res) => {
  const classes = await Classe.find();
  const deps = await Department.find();
  res.render('admin/classes', {classes, deps});
}

exports.createClasse = async (req, res) => {
  req.body.department = req.params.id;
  const classe = new Classe(req.body);
  classe.save()
  .then(cls => {
    res.redirect('back');
  })
  .catch(err => {
    res.json(err);
  });
}

exports.editClasse = async (req, res) => {
  const newData = req.body;
  await Classe
    .findByIdAndUpdate(
      {_id: req.params.id},
      {$set : newData}
    );
  res.redirect('back');
}

exports.deleteClasse = async (req, res) => {
  await Classe.findByIdAndRemove({_id: req.params.id});
  res.redirect('back');
}

//other functions

exports.getClassesByTeacher = async (req, res) => {
  const myclasses = await Classe.getClassesByTeacher();
  // const myclasses = await User.findById({_id: req.user.id}).populate('classes');
  res.json(myclasses);
}