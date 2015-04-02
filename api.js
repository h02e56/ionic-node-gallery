"use strict";

var multiparty = require('multiparty');
var util = require('util')

module.exports = function api() {
	
	var seneca = this;
  	
  	/*
  	routes mapping
  	 */
  	 seneca.act('role:web',{use:function(req,res,next) {

	    if( req.url == '/upload' ) {
	    	var form = new multiparty.Form();
		 	
		    form.parse(req, function(err, fields, files) {
		    	if (err) {
				    res.writeHead(400, {'content-type': 'text/plain'});
				    res.end("invalid request: " + err.message);
				    return;
				}
		      	res.writeHead(200, {'content-type': 'text/plain'});
		      	res.end(util.inspect({fields: fields, files: files}));
		    });

	    	// console.log('upload', req.files)
	    	// res.send({
	    	// 	message: 'entra'
	    	// })
	    }

	    // else this request is nothing to do with us!
	    else next()
	  }})
 }
