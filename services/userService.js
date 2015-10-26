var cryptoHelper = require('../helpers/cryptoHelper');
var User = require('../models/userModel');
var ApiResponse = require('../models/apiResponse');
var ApiMessages = require('../models/apiMessages');
var UserProfileModel = require('../models/userProfile');
var mongoose = require('mongoose');

var userService = {};

userService.register = function(userInfo, callback) {
    
    userInfo.passwordSalt = Math.floor(Math.random() * (100 - 0) + 0);;
    userInfo.passwordHash = cryptoHelper.createHash(userInfo.password, userInfo.passwordSalt)
   
    var newUser = new User(userInfo);

	User.findOne({ email: newUser.email }, function (err, user) {
    
        if (err) {
            return callback(err, new ApiResponse({ success: false, extras: { msg: ApiMessages.DB_ERROR } }));
        }
        
        if (user) {
            return callback(err, new ApiResponse({ success: false, extras: { msg: ApiMessages.EMAIL_ALREADY_EXISTS } }));
        } else {
        
            newUser.save(function (err, user, numberAffected) {
        
                if (err) {
                    return callback(err, new ApiResponse({ success: false, extras: { msg: ApiMessages.DB_ERROR } }));
                }
                    
                if (numberAffected === 1) {
        
                    var userProfileModel = new UserProfileModel({
                        email: user.email,
                        firstName: user.firstName,
                        lastName: user.lastName
                    });
        
                    return callback(err, new ApiResponse({
                        success: true, extras: {
                            userProfileModel: userProfileModel
                        }
                    }));
                } else {
                    return callback(err, new ApiResponse({ success: false, extras: { msg: ApiMessages.COULD_NOT_CREATE_USER } }));
                }             
        
            });
        }
	});
}

userService.login = function(email, password, callback) {
    
    User.findOne({ email: email }, function (err, user) {

        if (err) {
            return callback(err, new ApiResponse({ success: false, extras: { msg: ApiMessages.DB_ERROR } }));
        }

        if (user) {

            if (cryptoHelper.createHash(password, user.passwordSalt) == user.passwordHash) {

                var userProfileModel = new UserProfileModel({
                    email: user.email,
                    firstName: user.firstName,
                    lastName: user.lastName
                });

                return callback(err, new ApiResponse({
                    success: true, extras: {
                        userProfileModel: userProfileModel
                    }
                }));
                
            } else {
                return callback(err, new ApiResponse({ success: false, extras: { msg: ApiMessages.INVALID_PWD } }));
            }
            
        } else {
            return callback(err, new ApiResponse({ success: false, extras: { msg: ApiMessages.EMAIL_NOT_FOUND } }));
        }

    });
    
}

userService.checkUserExists = function(email, callback) {
    
    User.findOne({ email: email }, function (err, user) {

        if (err) {
            return callback(err, new ApiResponse({ success: false, extras: { msg: ApiMessages.DB_ERROR } }));
        }

        if (user) {

            var userProfileModel = new UserProfileModel({
                    email: user.email,
                    firstName: user.firstName,
                    lastName: user.lastName
                });

            return callback(err, new ApiResponse({
                    success: true, extras: {
                        userProfileModel: userProfileModel
                    }
                }));
            
        } else {
            return callback(err, new ApiResponse({ success: false, extras: { msg: ApiMessages.EMAIL_NOT_FOUND } }));
        }

    });
    
}

module.exports = userService;