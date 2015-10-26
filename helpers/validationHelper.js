var checkRegistrationData = function(regData) {
	
	if(!regData.email || !regData.password || !regData.confirmPassword || !regData.firstName || !regData.lastName) {
		return false;
	}
	
	if(regData.password === regData.confirmPassword) {
		return true;
	}
	
}

module.exports = checkRegistrationData;