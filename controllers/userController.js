const mongoose = require('mongoose');
const User = mongoose.model('User');
const Post = mongoose.model('Post');
const Email = mongoose.model('Email');
const Tag = mongoose.model('Tag');

exports.index = async (req, res) => {
	const postPromise = Post.find();
	const tagsPromise = Tag.find();
	const [posts, tags] = await Promise.all([postPromise, tagsPromise]);
	res.render('index', {'title': 'homepage', posts, tags});
};

exports.register = (req, res, next) => {
	const user = new User({ email: req.body.email, name: req.body.name });
	User.register(user, req.body.password, function(err){
		if(err) return res.send(err);
		//res.send('ok');
		next()
	});
};

exports.chat = (req, res) => {
	res.render('chat');
}

exports.profile = (req, res) => {
	res.render('profile', {'title':'profile'});
};

exports.update = (req, res) => {
	const updates = {
		email: req.body.email,
		name: req.body.name
	};

	const user = User.findOneAndUpdate(
		{_id: req.user._id}, 
		{$set: updates},
		{ new: true, runValidators: true, context: 'query'},
		function(err){
			if(err) return res.send(err);
				res.redirect('back');
		});
};

exports.contact = (req, res) => {
	res.render('contact', {'title':'contact'});
};

exports.sendEmail = (req, res) => {
	const email = new Email(req.body);
	email.created = Date.now();
	email.sender = req.user._id;
	email.save(function(err){
		if(err) return res.send(err);
		res.redirect('/');
	});
}

//just for testing functions
exports.gettesting = async (req, res) => {
	res.json('testin');
};

exports.posttesting = async (req, res) => {
	res.json({});
};