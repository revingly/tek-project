const mongoose = require('mongoose');
const Classe = mongoose.model('Classe');

// classes crud
exports.getClasses = async (req, res) => {
  const classes = await Classe.find();
  res.render('admin/classes', {classes});
}

exports.createClasse = async (req, res) => {
  const classe = new Classe(req.body);
  await classe.save();
  res.redirect('back');
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