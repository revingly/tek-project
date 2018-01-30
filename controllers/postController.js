const mongoose = require('mongoose');
const Post = mongoose.model('Post');
const User = mongoose.model('User');

exports.createPost = async (req, res) => {
    const post = new Post({text: req.body.text});
    post.author = req.user._id;
    post.createdAt = Date.now();
    post.tags = req.body.tags;
    await post.save();
	const user = await User.findOneAndUpdate({_id: req.user.id}, {$inc : { points: 1}});
	res.redirect('back')
};