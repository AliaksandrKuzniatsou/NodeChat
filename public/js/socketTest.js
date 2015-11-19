/* global io */

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
  
function getCookie(name) {
  var matches = document.cookie.match(new RegExp(
    "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
  ));
  return matches ? decodeURIComponent(matches[1]) : undefined;
}