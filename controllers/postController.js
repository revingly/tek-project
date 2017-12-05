const mongoose = require('mongoose');
const Post = mongoose.model('Post');
const User = mongoose.model('User');

exports.createPost = async (req, res) => {
	const post = new Post({text: req.body.text});
	const user = await User.findOneAndUpdate({_id: req.user.id}, {$inc : { points: 1}});
	post.author = req.user._id;
	post.createdAt = Date.now();
	post.tags = req.body.tags;
	await post.save();
	res.redirect('back')
};