"use strict";

var env = process.env.NODE_ENV || 'development'

var config = require('./config.js');
var argv = require('minimist')(process.argv.slice(2));
var port = argv['p'] || config.port || 3000

var http = require('http')
var express = require('express')
var bodyParser     = require('body-parser')
var cookieParser   = require('cookie-parser')
var methodOverride = require('method-override')

var ecstatic = require('ecstatic');

var seneca  = require('seneca')()

seneca.use('mongo-store', config.mongo);

//needs to know db up before do anything else
seneca.ready(function(err){
	(err) ? console.log(err) : console.log('conected to db')
   
	//start all stuff
	seneca.use('user')
	seneca.use('auth', {redirect:{always:false}} )
	seneca.use('./api.js')

	//create a rapid user for test
	var u = seneca.pin({role:'user',cmd:'*'})
	u.register({nick:'josep',name:'josep',email:'josep@h02e56.com',password:'test',active:true})
})

// set up express
var app = express()
app.use(cookieParser())
app.use(express.query())
app.use(bodyParser.urlencoded({extended: true}))
app.use(methodOverride())
app.use(bodyParser.json())

//static server
app.use(ecstatic({ root: __dirname + config.public }));

app.use( seneca.export('web') )

http.createServer(app).listen(port); 

console.log('Server running at http://localhost:' + port);

//browserync just for dev
if(env === 'development') fireBrowserSync(require('browser-sync'))

function fireBrowserSync (browserSync) {
  browserSync({
    proxy: '127.0.0.1:' + port,
    files: './' + config.public + '/**'//watch all public/client folder
  });
}




