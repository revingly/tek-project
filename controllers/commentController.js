const mongoose = require('mongoose');
const Comment = mongoose.model('Comment');

exports.getComments = async (req, res) => {
  const comments = await Comment.find();
  res.json(comments);
};

exports.createComment = async (req, res) => {
  req.body.user = req.user._id;
  req.body.created = Date.now();
  req.body.post = req.params.id;
  req.body.author = req.user._id;
  const comment = await (new Comment(req.body)).save();
  res.json(comment);
};