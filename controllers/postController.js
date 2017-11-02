const mongoose = require('mongoose');
const Post = mongoose.model('Post');


exports.createPost = (req, res) => {
	const post = new Post({text: req.body.text});
	post.author = req.user._id;
	post.createdAt = Date.now();
	post.tags = req.body.tags;
	post.save(function(err){
		if(err) return res.send(err);
		res.redirect('back');
	});
};