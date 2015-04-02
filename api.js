"use strict";

var multiparty = require('multiparty');

var uploadDir = './images'
var path = require('path')
var fs = require('fs')

module.exports = function api() {	
	
	var seneca = this;
  	/*
  	routes mapping
  	 */
  	seneca.act('role:web',{use:function(req,res,next) {

	    if( req.url == '/upload' ) {

	    	var options = {
	    		encoding:'base64',
	    		autoFiles: true,
	    		uploadDir: uploadDir
	    	}

	    	var form = new multiparty.Form(options);
		 	
		    form.parse(req, function(err, fields, files) {
		    	if (err) return sendError(err);
		    });

		    //events
		    //on write to disk rename it and send ok
		    form.on('file', function (name, file) {
		    	var newPath = path.join(uploadDir, file.originalFilename)
		    	console.log(name, file, newPath)
		    	fs.rename(file.path, newPath,  function(err){
		    		if(err) return sendError(err)
		    		res.writeHead(200, {'content-type': 'text/plain'});
		      		res.send({
		      			ok:true,
		      			filename: naem
		      		});
		    	})
		    })

		   var sendError = function sendError (err) {
				res.send({
		      		ok:true,
		      		why:err
		      	});
		    }
		   
	    }

	    //get current images
	    if (req.url == '/getimages') {
	    	var images = seneca.make$('images')
	    	images.list$({},function(err,list){
				res.send({
			      	ok:true,
			    	data:list
			    });  	
			})	    	
	    }

	    else next()
	  }})
 }
