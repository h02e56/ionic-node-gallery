'use strict'

var virtualURL = 'http://192.168.56.1:3000' //mi IP virtual
module.exports = {
	urls: {
		login : 	virtualURL + '/auth/login',
		register : 	virtualURL + '/auth/register',
		upload: 	virtualURL + '/upload'
	} 	

}