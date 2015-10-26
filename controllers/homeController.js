var homeController = {};

homeController.renderHome = function(req, res, next) {
	res.render('index', { title: 'Express' });
};

module.exports = homeController;