import { getCookie } from './helpers'

export function initSockets() {
	var socket = io.connect();

	socket.on('connect', function (data) {
		socket.emit('auth', getCookie('session'));
	});
	
	socket.on('authSuccess', function(data) {
		console.log(data);
	
		socket.on('typing', function(data) {
		  	console.log('typing');
		});
	});
}