var express = require('express');
var router = express.Router();
var homeController = require('./controllers/homeController');
var userController = require('./controllers/userController');
var chatController = require('./controllers/chatController');

// GET home page
router.get('/', homeController.renderHome);

// User routes
router.get('/users/login', userController.renderLogin);
router.post('/users/login', userController.login);
router.get('/users/register', userController.renderRegister);
router.post('/users/register', userController.register);
router.get('/users/logout', userController.logout);

router.get('/chat', userController.isAuthorized, chatController.renderChat);

module.exports = router; 