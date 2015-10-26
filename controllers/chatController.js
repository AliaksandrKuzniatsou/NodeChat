var chatController = {};

chatController.renderChat = function(req, res, next) {
	res.render('chat');
};

module.exports = chatController;