"use strict";

module.exports = function api() {
	
	var seneca = this;
  	
  	/*
  	routes mapping
  	 */
  	 seneca.act('role:web',{use:function(req,res,next) {

	    if( req.url == '/upload' ) {

	    	console.log('upload', req.body.photo)
	    	res.send({
	    		ok:true,
	    		message: 'entra'
	    	})
	    }

	    // else this request is nothing to do with us!
	    else next()
	  }})
 }
