const mongoose = require('mongoose');
const Tag = mongoose.model('Tag');
const User = mongoose.model('User');
const Message = mongoose.model('Message');

exports.dashboard = (req, res) => {
	res.render('admin/dashboard');
};

exports.getStudents = async (req, res) => {
	const students = await User.getStudentlist();
	res.send('students page');
};

exports.getTeachers = (req, res) => {
	res.send('teachers page');
};

exports.getEvents = (req, res) => {
	res.send('events page');
};

exports.getEmails = (req, res) => {
	res.send('emails page');
};

exports.getTags = (req, res) => {
	const tags = Tag.find();
	tags
		.then((tags)=> {
			res.render('admin/tags', {tags: tags});
		})
		.catch(e => {
			res.send(e);
		});
}

exports.createTag = (req, res) => {
	const tag = new Tag(req.body);
	tag.save(function(err){
		if(err) return res.send(err);
		res.redirect('back');
	})
}