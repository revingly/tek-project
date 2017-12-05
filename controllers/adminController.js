const mongoose = require('mongoose');
const Tag = mongoose.model('Tag');
const User = mongoose.model('User');
const Message = mongoose.model('Message');
const Course = mongoose.model('Course');

exports.dashboard = (req, res) => {
	res.render('admin/dashboard');
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

