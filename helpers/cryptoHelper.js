var crypto = require('crypto');
var config = require('../config/config');

var cryptoHelper = {};

cryptoHelper.encrypt = function(text) {
  
    var cipher = crypto.createCipher('aes-256-cbc', config.secretKey)
    var crypted = cipher.update(text, 'utf8', 'hex')
    crypted += cipher.final('hex'); 
    return crypted;
    
};

cryptoHelper.decrypt = function(text) {
    
    var decipher = crypto.createDecipher('aes-256-cbc', config.secretKey)
    var dec = decipher.update(text, 'hex' ,'utf8')
    dec += decipher.final('utf8');
    return dec;
    
}

cryptoHelper.createHash = function(text, salt) {
    
    salt = salt ? salt : '';
    return crypto.createHash('md5').update(text + salt).digest('hex');
    
}

module.exports = cryptoHelper;