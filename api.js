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

  		res.set('Content-Type', 'application/json');

	    if( req.url == '/upload' && req.method == 'POST') {

	    	var options = {
	    		// encoding:'base64',
	    		autoFiles: true,
	    		uploadDir: uploadDir
	    	}

	    	var form = new multiparty.Form(options);
		 	
		    form.parse(req, function(err, fields, files) {
		    	if (err) console.log(err);
		    })

		    //events
		    //on write to disk rename it and send ok
		    form.on('file', function (name, file) {
		    	var newPath = path.join(uploadDir, file.originalFilename)
		    	fs.rename(file.path, newPath,  function(err){
		    		 console.log(err);
		    	})
	    		res.send({
	      			ok:true,
	      			filename: name
	      		})
		    })
		   
	    }

	    //get current images
	    if (req.url == '/gallery') {
	    	var images = seneca.make$('images')
	    	images.list$({},function(err,list){
	    		if (err) console.log(err);
				res.send({
			      	ok:true,
			    	data:list
			    });  	
			})	    	
	    }

	    else next()

	  }})
	

 }
