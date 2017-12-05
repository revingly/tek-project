const mongoose = require('mongoose');
const User = mongoose.model('User');
const Post = mongoose.model('Post');
const Email = mongoose.model('Email');
const Tag = mongoose.model('Tag');

exports.index = async (req, res) => {
	const postPromise = Post.find().sort('-createdAt');
	const tagsPromise = Tag.find();
	const [posts, tags] = await Promise.all([postPromise, tagsPromise]);
	res.render('index', {'title': 'homepage', posts, tags});
};

exports.register = (req, res) => {
	const user = new User({ email: req.body.email, name: req.body.name });
	user.tags = req.body.tags;
	User.register(user, req.body.password, function(err){
		if(err) return res.send(err);
		//res.send('ok');
		res.redirect('back')
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

//search
exports.search = async (req, res) => {
	const posts = await Post.find({
		$text: {
			$search: req.query.q
		}
	});
	res.json(posts);
}

exports.getTags = async (req, res) => {
	const tags = await Tag.find();
	res.render('tags', {tags});
};

exports.createTag = (req, res) => {
	const tag = new Tag(req.body);
	tag.save(function(err){
		if(err) return res.send(err);
		res.redirect('back');
	})
}

//library
exports.getBooks = (req, res) => {
	res.render('books', {title: "library"});
}

//courses controls
exports.getCourses = async (req, res) => {
	//const courses = await Course.find({});
	res.render('courses', {title: "courses"});
}

exports.createCourse = async (req, res) => {
	const course = new Course(req.body);
	await course.save();
	res.redirect('back');
}

//reactions
exports.like = async (req, res) => {
	const likes = req.user.likes.map(obj => obj.toString());
  const operator = likes.includes(req.params.id) ? '$pull' : '$addToSet';
  const user = await User
  .findByIdAndUpdate(req.user._id,
    { [operator]: { likes: req.params.id }},
    { new: true }
  );
  res.json(user);
}