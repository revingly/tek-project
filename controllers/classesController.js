const mongoose = require('mongoose');
const Classe = mongoose.model('Classe');
const User = mongoose.model('User');

// classes crud
exports.getClasses = async (req, res) => {
  const classes = await Classe.find();
  res.render('admin/classes', {classes});
}

exports.createClasse = async (req, res) => {
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

exports.getClasseStudents = (req, res) => {
  const name = req.params.name;
  Classe.findOne({name: `${name}`})
    .then(rs => res.render('admin/classe_details', {rs}))
    .catch(err => res.json(err));
}

exports.getClasseSubjects = (req, res) => {
  const name = req.params.name;
  Classe.find({name: `${name}`})
    .then(rs => res.json(rs))
    .catch(err => res.json(err));
}

exports.addStudentsToClasse = (req, res) => {
  const name = req.params.name;
  const studentsId = req.body.students;
  Classe.update(
    {name: name},
    {$push: {students: {$each : studentsId }}})
    .then(rs => res.json(rs))
    .catch(err => res.json(err));
}