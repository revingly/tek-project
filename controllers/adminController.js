const mongoose = require('mongoose');
const Tag = mongoose.model('Tag');
const User = mongoose.model('User');
const Message = mongoose.model('Message');
const Course = mongoose.model('Course');
const Book = mongoose.model('Book');

exports.dashboard = (req, res) => {
	res.render('admin/dashboard');
};

exports.register = async (req, res) => {
	const tags = await Tag.find();
	res.render('admin/user', {tags});
};

exports.createUser = (req, res) => {
	const user = new User({ email: req.body.email, name: req.body.name });
	user.tags = req.body.tags;
	User.register(user, req.body.password, function(err){
		if(err) return res.send(err);
		//res.send('ok');
		res.redirect('back')
	});
};

exports.getStudents = async (req, res) => {
	const students = await User.find({ tags : { $in : ["student"]}});
	res.render('admin/students', {students});
};

exports.getTeachers = async (req, res) => {
	const teachers = await User.find({ tags : { $in : ["teacher"]}});
	res.render('admin/teachers', {teachers});
};

exports.getEvents = async (req, res) => {
	const events = await Post.find({ tags : { $in : ["event"]}});
	res.render('admin/events', {events});
};

exports.getEmails = async (req, res) => {
	res.send('emails page');
};

exports.lockStudent = async (req, res) => {
	await User.findOneAndUpdate({"_id": req.params.id}, {$set: {"status": "locked"}}, function(err){
		if(err) return res.send(err);
		res.redirect('back');
	});
};

exports.unlockStudent = async (req, res) => {
	await User.findOneAndUpdate({"_id": req.params.id}, {$set: {"status": "active"}}, function(err){
		if(err) return res.send(err);
		res.redirect('back');
	});
};

exports.deleteStudent = async (req, res) => {
	res.send('deleted');
};

exports.updateStudent = async (req, res) => {
	res.send('updated');
};

//books
exports.getBooks = async (req, res) => {
	const books = await Book.find();
	res.render('admin/books', {title: 'books', books});
};

exports.createBook = (req, res) => {
	const book = new Book(req.body);
	book.save()
	.then(book => {
		res.redirect('back');
	})
	.catch(err => {
		res.send(err);
	});
};

//courses
exports.getCourses = async (req, res) => {
	const courses = await Course.find();
	res.render('admin/courses', {title: 'courses', courses});
};

exports.createCourse = (req, res) => {
	const course = new Course(req.body);
	course.save()
	.then(crs => {
		res.redirect('back');
	})
	.catch(err => {
		res.send(err);
	});
};