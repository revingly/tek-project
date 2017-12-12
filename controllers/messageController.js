const mongoose = require('mongoose');
const Message = require('../models/messages');


exports.createMessage = (data) => {
	const message = new Message({messageText: req.body.message});
	message.createdAt = Date.now();
	message.author = req.user._id;
	message.save(function(err, msg){
		if(err) return err;
		return msg;
	});
};
