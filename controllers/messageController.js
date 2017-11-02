const mongoose = require('mongoose');
const Message = mongoose.model('Message');


exports.createMessage = (req, res) => {
	const message = new Message({messageText: req.body.message});
	message.createdAt = Date.now();
	message.author = req.user._id;
	message.save(function(err){
		if(err) return res.send(err);
		res.send('message ok');
	});
};
