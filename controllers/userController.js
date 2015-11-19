var validationHelper = require('../helpers/validationHelper.js');
var cryptoHelper = require('../helpers/cryptoHelper.js');
var userService = require('../services/userService');

var userController = {};

userController.renderLogin = function(req, res, next) {
	res.render('login', {});
};

userController.login = function(req, res, next) {
	userService.login(req.body.email, req.body.password, function(err, userData) {
        
        if(userData.success) {
            res.cookie('session', cryptoHelper.encrypt(userData.extras.userProfileModel.email));
            res.redirect('/chat');
        } else {
            res.render('login');
        }
       
    }); 
};

userController.renderRegister = function(req, res, next) {
	res.render('register');
};

userController.register = function(req, res, next) {
	if(validationHelper(req.body)) {
         userService.register(req.body, function(err, result) {
             if(result.success) {
                res.redirect('/');
             } else {
                res.render('register', {message: 'User with this email already exists!'});    
             }
         });
    } else {
        res.render('register', {message: 'Check entered details!'});
    }
}; 

userController.isAuthorized = function(req, res, next) {   
    if(req.cookies.session) {
        
        var userEmail = cryptoHelper.decrypt(req.cookies.session);
        
        userService.checkUserExists(userEmail, function(err, userData) {
           
            req.user = userData.extras.userProfileModel;
            next();
            
        }); 
        
    } else {
        
        res.redirect('/users/login');
        
    } 
};

userController.logout = function(req, res, next) {
    res.clearCookie('session');
    res.redirect('/');
};

module.exports = userController;