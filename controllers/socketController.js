var cryptoHelper = require('../helpers/cryptoHelper.js');
var userService = require('../services/userService');

function setEvents(io) {
	
	io.on('connection', function(socket) {

		socket.isAuth = false;
		
		socket.on('auth', function(msg) {
			
			var userEmail = cryptoHelper.decrypt(msg);
        
	        userService.checkUserExists(userEmail, function(err, userData) {
	           
	            socket.user = userData.extras.userProfileModel;
	      		socket.isAuth = true;
				  
				io.to(socket.id).emit('authSuccess', 'success');  
				  
	        }); 	
			
		});
	});
	
}

module.exports = setEvents;