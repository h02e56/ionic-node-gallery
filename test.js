var test = require('tape')
var request = require('request')

var config = require('./config.js')
var port = config.port;

test('test auth plugin', function(t){

  var url = 'http://127.0.0.1:' + port +'/auth/login'
  
  t.plan(2);

  var wrongUser = {
    email:"test",
    password:"test"
  }

    request({
        method:'POST',
        url:url,
        body: wrongUser,
        json: true
        },function cb(err, httpResponse, body) {
          if (err) {
            return console.error('auth plugin failed:', err);
          }
          t.notOk(body.ok, "wrong auth must fail");
        }
    )

    var user = {
        email:"josep@h02e56.com",
        password:"test"
    }

    request({
        method:'POST',
        url:url,
        body: user,
        json: true
        },function cb(err, httpResponse, body) {
          if (err) {
            return console.error('auth plugin failed:', err);
          }
          t.ok(body.ok, "right user enters");
        }
    )
})

test('registration', function(t){
    var url = 'http://127.0.0.1:' + port +'/auth/register'
    var user = {
        name:'fdsfdsffgfdsdfds',
        email:"fdsfdsfdsgfdgdffdsfds",
        password:"tesgfdvf"
    }

    request({
        method:'POST',
        url:url,
        body: user,
        json: true
        },function cb(err, httpResponse, body) {
            console.log(err, body)
          if (err) {
            return console.error('auth plugin failed:', err);
          }
          t.ok(body.ok, "wrong auth must fail");
          t.end()
        }
    )
})
