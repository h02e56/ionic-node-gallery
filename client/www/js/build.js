(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({"/Users/josep/Documents/work/nearform/v2/client/www/js/app.js":[function(require,module,exports){
var mygalleryController = require('./controllers.js')
var services = require('./services.js')

module.exports = angular.module('mygallery', ['ionic', mygalleryController.name, services.name, 'ngCordova'])
  .run(function($ionicPlatform) {
    $ionicPlatform.ready(function() {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      if (window.cordova && window.cordova.plugins.Keyboard) {
        cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      }
      if (window.StatusBar) {
        // org.apache.cordova.statusbar required
        StatusBar.styleDefault();
      }
    });
    
  })
  .config(function($stateProvider, $urlRouterProvider) {

    // Ionic uses AngularUI Router which uses the concept of states
    // Learn more here: https://github.com/angular-ui/ui-router
    // Set up the various states which the app can be in.
    // Each state's controller can be found in controllers.js
    $stateProvider

    // register 
    .state('register', {
      url: '/register',
      templateUrl: 'templates/register.html',
      controller: 'RegisterCtrl'
    })

    // login
    .state('login', {
      url: '/login',
      templateUrl: 'templates/login.html',
      controller: 'LoginCtrl'
    })
    
    // account
    .state('account', {
      url: '/account',
      templateUrl: 'templates/account.html',
      controller: 'AccountCtrl'
    })
    
    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/account');

  });


},{"./controllers.js":"/Users/josep/Documents/work/nearform/v2/client/www/js/controllers.js","./services.js":"/Users/josep/Documents/work/nearform/v2/client/www/js/services.js"}],"/Users/josep/Documents/work/nearform/v2/client/www/js/controllers.js":[function(require,module,exports){
module.exports = angular.module('mygallery.controllers', [])

	.controller('AccountCtrl', function($scope, $http, $cordovaCamera, $cordovaFileTransfer) {
		
		var url = "/upload";

		//camera stuff
		document.addEventListener("deviceready", function () {
		    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
		    // for form inputs)
		    if (window.cordova && window.cordova.plugins.Keyboard) {
		      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
		    }
		    if (window.StatusBar) {
		      // org.apache.cordova.statusbar required
		      StatusBar.styleDefault();
		    }	  

		    var options = {
				quality: 50,
				destinationType: Camera.DestinationType.DATA_URL,
				sourceType: Camera.PictureSourceType.CAMERA,
				allowEdit: true,
				encodingType: Camera.EncodingType.JPEG,
				targetWidth: 100,
				targetHeight: 100,
				popoverOptions: CameraPopoverOptions,
				saveToPhotoAlbum: false
			};  

		    $scope.upload = function (arguments) {
		    	$cordovaFileTransfer.upload
		    }

		    $scope.capturePhoto = function () {
		    	$cordovaCamera.getPicture(options).then(function(imageData) {
					var gallery = document.getElementById('gallery'); 
					var image = document.createElement('img')
					// var image = document.getElementById('myImage');
					image.src = "data:image/jpeg;base64," + imageData;
					// image.style="display:inline-block"
					gallery.appendChild(image)

					//upload file
					// uploadPhoto()
					
				}, function (err) {
					alert(err)
				});
		    }

		     //upload to server
		    function uploadPhoto(data) {	
		    	// var filePath = Camera.DestinationType.FILE_URI;//path to current image
			    var trustHosts = true;
			    var options = {};
			    
			    //REQUEST OPTIONS
			    //we are sending base64
			    var req = {
					method: 'POST',
					url: url,
					headers: {
						'Content-Type': 'application/json'
					},
					data: {
						data:'dds'
					}
				}
				var data = {
					test:'tes'
				}
			  
			    $http.post(url, data)
			    	.success(function(data, status, headers, config) {
						alert(data)
				   		if(data.ok === true) {
				   			//hide modal loading
				   			alert('ok', data.message)
			            }else{
			            	alert(data.err) 
			            }
					})
					.error(function(data, status, headers, config) {
						alert(data)
						alert(status)
						alert(JSON.stringify(headers))
					});	        
			  	// $cordovaFileTransfer.upload(url, filePath, options, trustHosts)
				  //   .then(function(result) {
				  //       // Success!
				  //   }, function (err) {
				  //    	alert(err)
				  //   }, function (progress) {
				  //       // constant progress updates
				  //   });

			  	// }, false);
		    }
		});
		
	})

	.controller('RegisterCtrl', function($scope, $http, $location,  $window, $ionicLoading, $ionicModal){

		$scope.err = ''//error message 

		//modal setup
		$ionicModal.fromTemplateUrl('my-modal.html', {
		    scope: $scope,
		    animation: 'slide-in-up'
		  }).then(function(modal) {
		    $scope.modal = modal;
		});
		
		$scope.openModal = function() {
		    $scope.modal.show();
		};
		
		$scope.closeModal = function() {
		    $scope.modal.hide();
		};
		
		$scope.submit = function(user){
			var url = '/auth/register';
						
			//modal loading
			$scope.showLoading('loading...')
			
			$http.post(url, user)
				.success(function(data, status, headers, config) {
			   		if(data.ok === true) {
			   			//hide modal loading
			   			$scope.hideLoading()
		            	$location.path("/account")
		            }else{
		            	$scope.err = data.why
		            	$scope.hideLoading()
		        		// $scope.openModal()    	
		            }
				})
				.error(function(data, status, headers, config) {
					$scope.err = data.why
				  	$scope.hideLoading()
				  	// $scope.openModal()
				});	        
		}

		$scope.showLoading = function(msg) {
		    $ionicLoading.show({
		      template: msg
		    });
			};

		$scope.hideLoading = function(){
		    $ionicLoading.hide();
		};
	})

	.controller('LoginCtrl', function($scope, $http, $location,  $window, $ionicLoading, $ionicModal){

		$scope.err = ''//error message 

		//modal setup
		$ionicModal.fromTemplateUrl('my-modal.html', {
		    scope: $scope,
		    animation: 'slide-in-up'
		  }).then(function(modal) {
		    $scope.modal = modal;
		});
		
		$scope.openModal = function() {
		    $scope.modal.show();
		};
		
		$scope.closeModal = function() {
		    $scope.modal.hide();
		};
		
		$scope.submit = function(user){
			var url = '/auth/login';
						
			//modal loading
			$scope.showLoading('loading...')
			
			$http.post(url, user)
				.success(function(data, status, headers, config) {
			   		if(data.ok === true) {
			   			//hide modal loading
			   			$scope.hideLoading()
		            	$location.path("/account")
		            }else{
		            	$scope.err = data.why
		            	$scope.hideLoading()
		        		// $scope.openModal()    	
		            }
				})
				.error(function(data, status, headers, config) {
					$scope.err = data.why
				  	$scope.hideLoading()
				  	// $scope.openModal()
				});	        
		}

		$scope.showLoading = function(msg) {
		    $ionicLoading.show({
		      template: msg
		    });
			};

		$scope.hideLoading = function(){
		    $ionicLoading.hide();
		};		

	})
},{}],"/Users/josep/Documents/work/nearform/v2/client/www/js/services.js":[function(require,module,exports){
module.exports = angular.module('mygallery.services', [])

},{}]},{},["/Users/josep/Documents/work/nearform/v2/client/www/js/app.js"])
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3Vzci9sb2NhbC9saWIvbm9kZV9tb2R1bGVzL3dhdGNoaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJjbGllbnQvd3d3L2pzL2FwcC5qcyIsImNsaWVudC93d3cvanMvY29udHJvbGxlcnMuanMiLCJjbGllbnQvd3d3L2pzL3NlcnZpY2VzLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNwREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN0TkE7QUFDQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJ2YXIgbXlnYWxsZXJ5Q29udHJvbGxlciA9IHJlcXVpcmUoJy4vY29udHJvbGxlcnMuanMnKVxudmFyIHNlcnZpY2VzID0gcmVxdWlyZSgnLi9zZXJ2aWNlcy5qcycpXG5cbm1vZHVsZS5leHBvcnRzID0gYW5ndWxhci5tb2R1bGUoJ215Z2FsbGVyeScsIFsnaW9uaWMnLCBteWdhbGxlcnlDb250cm9sbGVyLm5hbWUsIHNlcnZpY2VzLm5hbWUsICduZ0NvcmRvdmEnXSlcbiAgLnJ1bihmdW5jdGlvbigkaW9uaWNQbGF0Zm9ybSkge1xuICAgICRpb25pY1BsYXRmb3JtLnJlYWR5KGZ1bmN0aW9uKCkge1xuICAgICAgLy8gSGlkZSB0aGUgYWNjZXNzb3J5IGJhciBieSBkZWZhdWx0IChyZW1vdmUgdGhpcyB0byBzaG93IHRoZSBhY2Nlc3NvcnkgYmFyIGFib3ZlIHRoZSBrZXlib2FyZFxuICAgICAgLy8gZm9yIGZvcm0gaW5wdXRzKVxuICAgICAgaWYgKHdpbmRvdy5jb3Jkb3ZhICYmIHdpbmRvdy5jb3Jkb3ZhLnBsdWdpbnMuS2V5Ym9hcmQpIHtcbiAgICAgICAgY29yZG92YS5wbHVnaW5zLktleWJvYXJkLmhpZGVLZXlib2FyZEFjY2Vzc29yeUJhcih0cnVlKTtcbiAgICAgIH1cbiAgICAgIGlmICh3aW5kb3cuU3RhdHVzQmFyKSB7XG4gICAgICAgIC8vIG9yZy5hcGFjaGUuY29yZG92YS5zdGF0dXNiYXIgcmVxdWlyZWRcbiAgICAgICAgU3RhdHVzQmFyLnN0eWxlRGVmYXVsdCgpO1xuICAgICAgfVxuICAgIH0pO1xuICAgIFxuICB9KVxuICAuY29uZmlnKGZ1bmN0aW9uKCRzdGF0ZVByb3ZpZGVyLCAkdXJsUm91dGVyUHJvdmlkZXIpIHtcblxuICAgIC8vIElvbmljIHVzZXMgQW5ndWxhclVJIFJvdXRlciB3aGljaCB1c2VzIHRoZSBjb25jZXB0IG9mIHN0YXRlc1xuICAgIC8vIExlYXJuIG1vcmUgaGVyZTogaHR0cHM6Ly9naXRodWIuY29tL2FuZ3VsYXItdWkvdWktcm91dGVyXG4gICAgLy8gU2V0IHVwIHRoZSB2YXJpb3VzIHN0YXRlcyB3aGljaCB0aGUgYXBwIGNhbiBiZSBpbi5cbiAgICAvLyBFYWNoIHN0YXRlJ3MgY29udHJvbGxlciBjYW4gYmUgZm91bmQgaW4gY29udHJvbGxlcnMuanNcbiAgICAkc3RhdGVQcm92aWRlclxuXG4gICAgLy8gcmVnaXN0ZXIgXG4gICAgLnN0YXRlKCdyZWdpc3RlcicsIHtcbiAgICAgIHVybDogJy9yZWdpc3RlcicsXG4gICAgICB0ZW1wbGF0ZVVybDogJ3RlbXBsYXRlcy9yZWdpc3Rlci5odG1sJyxcbiAgICAgIGNvbnRyb2xsZXI6ICdSZWdpc3RlckN0cmwnXG4gICAgfSlcblxuICAgIC8vIGxvZ2luXG4gICAgLnN0YXRlKCdsb2dpbicsIHtcbiAgICAgIHVybDogJy9sb2dpbicsXG4gICAgICB0ZW1wbGF0ZVVybDogJ3RlbXBsYXRlcy9sb2dpbi5odG1sJyxcbiAgICAgIGNvbnRyb2xsZXI6ICdMb2dpbkN0cmwnXG4gICAgfSlcbiAgICBcbiAgICAvLyBhY2NvdW50XG4gICAgLnN0YXRlKCdhY2NvdW50Jywge1xuICAgICAgdXJsOiAnL2FjY291bnQnLFxuICAgICAgdGVtcGxhdGVVcmw6ICd0ZW1wbGF0ZXMvYWNjb3VudC5odG1sJyxcbiAgICAgIGNvbnRyb2xsZXI6ICdBY2NvdW50Q3RybCdcbiAgICB9KVxuICAgIFxuICAgIC8vIGlmIG5vbmUgb2YgdGhlIGFib3ZlIHN0YXRlcyBhcmUgbWF0Y2hlZCwgdXNlIHRoaXMgYXMgdGhlIGZhbGxiYWNrXG4gICAgJHVybFJvdXRlclByb3ZpZGVyLm90aGVyd2lzZSgnL2FjY291bnQnKTtcblxuICB9KTtcblxuIiwibW9kdWxlLmV4cG9ydHMgPSBhbmd1bGFyLm1vZHVsZSgnbXlnYWxsZXJ5LmNvbnRyb2xsZXJzJywgW10pXG5cblx0LmNvbnRyb2xsZXIoJ0FjY291bnRDdHJsJywgZnVuY3Rpb24oJHNjb3BlLCAkaHR0cCwgJGNvcmRvdmFDYW1lcmEsICRjb3Jkb3ZhRmlsZVRyYW5zZmVyKSB7XG5cdFx0XG5cdFx0dmFyIHVybCA9IFwiL3VwbG9hZFwiO1xuXG5cdFx0Ly9jYW1lcmEgc3R1ZmZcblx0XHRkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwiZGV2aWNlcmVhZHlcIiwgZnVuY3Rpb24gKCkge1xuXHRcdCAgICAvLyBIaWRlIHRoZSBhY2Nlc3NvcnkgYmFyIGJ5IGRlZmF1bHQgKHJlbW92ZSB0aGlzIHRvIHNob3cgdGhlIGFjY2Vzc29yeSBiYXIgYWJvdmUgdGhlIGtleWJvYXJkXG5cdFx0ICAgIC8vIGZvciBmb3JtIGlucHV0cylcblx0XHQgICAgaWYgKHdpbmRvdy5jb3Jkb3ZhICYmIHdpbmRvdy5jb3Jkb3ZhLnBsdWdpbnMuS2V5Ym9hcmQpIHtcblx0XHQgICAgICBjb3Jkb3ZhLnBsdWdpbnMuS2V5Ym9hcmQuaGlkZUtleWJvYXJkQWNjZXNzb3J5QmFyKHRydWUpO1xuXHRcdCAgICB9XG5cdFx0ICAgIGlmICh3aW5kb3cuU3RhdHVzQmFyKSB7XG5cdFx0ICAgICAgLy8gb3JnLmFwYWNoZS5jb3Jkb3ZhLnN0YXR1c2JhciByZXF1aXJlZFxuXHRcdCAgICAgIFN0YXR1c0Jhci5zdHlsZURlZmF1bHQoKTtcblx0XHQgICAgfVx0ICBcblxuXHRcdCAgICB2YXIgb3B0aW9ucyA9IHtcblx0XHRcdFx0cXVhbGl0eTogNTAsXG5cdFx0XHRcdGRlc3RpbmF0aW9uVHlwZTogQ2FtZXJhLkRlc3RpbmF0aW9uVHlwZS5EQVRBX1VSTCxcblx0XHRcdFx0c291cmNlVHlwZTogQ2FtZXJhLlBpY3R1cmVTb3VyY2VUeXBlLkNBTUVSQSxcblx0XHRcdFx0YWxsb3dFZGl0OiB0cnVlLFxuXHRcdFx0XHRlbmNvZGluZ1R5cGU6IENhbWVyYS5FbmNvZGluZ1R5cGUuSlBFRyxcblx0XHRcdFx0dGFyZ2V0V2lkdGg6IDEwMCxcblx0XHRcdFx0dGFyZ2V0SGVpZ2h0OiAxMDAsXG5cdFx0XHRcdHBvcG92ZXJPcHRpb25zOiBDYW1lcmFQb3BvdmVyT3B0aW9ucyxcblx0XHRcdFx0c2F2ZVRvUGhvdG9BbGJ1bTogZmFsc2Vcblx0XHRcdH07ICBcblxuXHRcdCAgICAkc2NvcGUudXBsb2FkID0gZnVuY3Rpb24gKGFyZ3VtZW50cykge1xuXHRcdCAgICBcdCRjb3Jkb3ZhRmlsZVRyYW5zZmVyLnVwbG9hZFxuXHRcdCAgICB9XG5cblx0XHQgICAgJHNjb3BlLmNhcHR1cmVQaG90byA9IGZ1bmN0aW9uICgpIHtcblx0XHQgICAgXHQkY29yZG92YUNhbWVyYS5nZXRQaWN0dXJlKG9wdGlvbnMpLnRoZW4oZnVuY3Rpb24oaW1hZ2VEYXRhKSB7XG5cdFx0XHRcdFx0dmFyIGdhbGxlcnkgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZ2FsbGVyeScpOyBcblx0XHRcdFx0XHR2YXIgaW1hZ2UgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbWcnKVxuXHRcdFx0XHRcdC8vIHZhciBpbWFnZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdteUltYWdlJyk7XG5cdFx0XHRcdFx0aW1hZ2Uuc3JjID0gXCJkYXRhOmltYWdlL2pwZWc7YmFzZTY0LFwiICsgaW1hZ2VEYXRhO1xuXHRcdFx0XHRcdC8vIGltYWdlLnN0eWxlPVwiZGlzcGxheTppbmxpbmUtYmxvY2tcIlxuXHRcdFx0XHRcdGdhbGxlcnkuYXBwZW5kQ2hpbGQoaW1hZ2UpXG5cblx0XHRcdFx0XHQvL3VwbG9hZCBmaWxlXG5cdFx0XHRcdFx0Ly8gdXBsb2FkUGhvdG8oKVxuXHRcdFx0XHRcdFxuXHRcdFx0XHR9LCBmdW5jdGlvbiAoZXJyKSB7XG5cdFx0XHRcdFx0YWxlcnQoZXJyKVxuXHRcdFx0XHR9KTtcblx0XHQgICAgfVxuXG5cdFx0ICAgICAvL3VwbG9hZCB0byBzZXJ2ZXJcblx0XHQgICAgZnVuY3Rpb24gdXBsb2FkUGhvdG8oZGF0YSkge1x0XG5cdFx0ICAgIFx0Ly8gdmFyIGZpbGVQYXRoID0gQ2FtZXJhLkRlc3RpbmF0aW9uVHlwZS5GSUxFX1VSSTsvL3BhdGggdG8gY3VycmVudCBpbWFnZVxuXHRcdFx0ICAgIHZhciB0cnVzdEhvc3RzID0gdHJ1ZTtcblx0XHRcdCAgICB2YXIgb3B0aW9ucyA9IHt9O1xuXHRcdFx0ICAgIFxuXHRcdFx0ICAgIC8vUkVRVUVTVCBPUFRJT05TXG5cdFx0XHQgICAgLy93ZSBhcmUgc2VuZGluZyBiYXNlNjRcblx0XHRcdCAgICB2YXIgcmVxID0ge1xuXHRcdFx0XHRcdG1ldGhvZDogJ1BPU1QnLFxuXHRcdFx0XHRcdHVybDogdXJsLFxuXHRcdFx0XHRcdGhlYWRlcnM6IHtcblx0XHRcdFx0XHRcdCdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24vanNvbidcblx0XHRcdFx0XHR9LFxuXHRcdFx0XHRcdGRhdGE6IHtcblx0XHRcdFx0XHRcdGRhdGE6J2Rkcydcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdFx0dmFyIGRhdGEgPSB7XG5cdFx0XHRcdFx0dGVzdDondGVzJ1xuXHRcdFx0XHR9XG5cdFx0XHQgIFxuXHRcdFx0ICAgICRodHRwLnBvc3QodXJsLCBkYXRhKVxuXHRcdFx0ICAgIFx0LnN1Y2Nlc3MoZnVuY3Rpb24oZGF0YSwgc3RhdHVzLCBoZWFkZXJzLCBjb25maWcpIHtcblx0XHRcdFx0XHRcdGFsZXJ0KGRhdGEpXG5cdFx0XHRcdCAgIFx0XHRpZihkYXRhLm9rID09PSB0cnVlKSB7XG5cdFx0XHRcdCAgIFx0XHRcdC8vaGlkZSBtb2RhbCBsb2FkaW5nXG5cdFx0XHRcdCAgIFx0XHRcdGFsZXJ0KCdvaycsIGRhdGEubWVzc2FnZSlcblx0XHRcdCAgICAgICAgICAgIH1lbHNle1xuXHRcdFx0ICAgICAgICAgICAgXHRhbGVydChkYXRhLmVycikgXG5cdFx0XHQgICAgICAgICAgICB9XG5cdFx0XHRcdFx0fSlcblx0XHRcdFx0XHQuZXJyb3IoZnVuY3Rpb24oZGF0YSwgc3RhdHVzLCBoZWFkZXJzLCBjb25maWcpIHtcblx0XHRcdFx0XHRcdGFsZXJ0KGRhdGEpXG5cdFx0XHRcdFx0XHRhbGVydChzdGF0dXMpXG5cdFx0XHRcdFx0XHRhbGVydChKU09OLnN0cmluZ2lmeShoZWFkZXJzKSlcblx0XHRcdFx0XHR9KTtcdCAgICAgICAgXG5cdFx0XHQgIFx0Ly8gJGNvcmRvdmFGaWxlVHJhbnNmZXIudXBsb2FkKHVybCwgZmlsZVBhdGgsIG9wdGlvbnMsIHRydXN0SG9zdHMpXG5cdFx0XHRcdCAgLy8gICAudGhlbihmdW5jdGlvbihyZXN1bHQpIHtcblx0XHRcdFx0ICAvLyAgICAgICAvLyBTdWNjZXNzIVxuXHRcdFx0XHQgIC8vICAgfSwgZnVuY3Rpb24gKGVycikge1xuXHRcdFx0XHQgIC8vICAgIFx0YWxlcnQoZXJyKVxuXHRcdFx0XHQgIC8vICAgfSwgZnVuY3Rpb24gKHByb2dyZXNzKSB7XG5cdFx0XHRcdCAgLy8gICAgICAgLy8gY29uc3RhbnQgcHJvZ3Jlc3MgdXBkYXRlc1xuXHRcdFx0XHQgIC8vICAgfSk7XG5cblx0XHRcdCAgXHQvLyB9LCBmYWxzZSk7XG5cdFx0ICAgIH1cblx0XHR9KTtcblx0XHRcblx0fSlcblxuXHQuY29udHJvbGxlcignUmVnaXN0ZXJDdHJsJywgZnVuY3Rpb24oJHNjb3BlLCAkaHR0cCwgJGxvY2F0aW9uLCAgJHdpbmRvdywgJGlvbmljTG9hZGluZywgJGlvbmljTW9kYWwpe1xuXG5cdFx0JHNjb3BlLmVyciA9ICcnLy9lcnJvciBtZXNzYWdlIFxuXG5cdFx0Ly9tb2RhbCBzZXR1cFxuXHRcdCRpb25pY01vZGFsLmZyb21UZW1wbGF0ZVVybCgnbXktbW9kYWwuaHRtbCcsIHtcblx0XHQgICAgc2NvcGU6ICRzY29wZSxcblx0XHQgICAgYW5pbWF0aW9uOiAnc2xpZGUtaW4tdXAnXG5cdFx0ICB9KS50aGVuKGZ1bmN0aW9uKG1vZGFsKSB7XG5cdFx0ICAgICRzY29wZS5tb2RhbCA9IG1vZGFsO1xuXHRcdH0pO1xuXHRcdFxuXHRcdCRzY29wZS5vcGVuTW9kYWwgPSBmdW5jdGlvbigpIHtcblx0XHQgICAgJHNjb3BlLm1vZGFsLnNob3coKTtcblx0XHR9O1xuXHRcdFxuXHRcdCRzY29wZS5jbG9zZU1vZGFsID0gZnVuY3Rpb24oKSB7XG5cdFx0ICAgICRzY29wZS5tb2RhbC5oaWRlKCk7XG5cdFx0fTtcblx0XHRcblx0XHQkc2NvcGUuc3VibWl0ID0gZnVuY3Rpb24odXNlcil7XG5cdFx0XHR2YXIgdXJsID0gJy9hdXRoL3JlZ2lzdGVyJztcblx0XHRcdFx0XHRcdFxuXHRcdFx0Ly9tb2RhbCBsb2FkaW5nXG5cdFx0XHQkc2NvcGUuc2hvd0xvYWRpbmcoJ2xvYWRpbmcuLi4nKVxuXHRcdFx0XG5cdFx0XHQkaHR0cC5wb3N0KHVybCwgdXNlcilcblx0XHRcdFx0LnN1Y2Nlc3MoZnVuY3Rpb24oZGF0YSwgc3RhdHVzLCBoZWFkZXJzLCBjb25maWcpIHtcblx0XHRcdCAgIFx0XHRpZihkYXRhLm9rID09PSB0cnVlKSB7XG5cdFx0XHQgICBcdFx0XHQvL2hpZGUgbW9kYWwgbG9hZGluZ1xuXHRcdFx0ICAgXHRcdFx0JHNjb3BlLmhpZGVMb2FkaW5nKClcblx0XHQgICAgICAgICAgICBcdCRsb2NhdGlvbi5wYXRoKFwiL2FjY291bnRcIilcblx0XHQgICAgICAgICAgICB9ZWxzZXtcblx0XHQgICAgICAgICAgICBcdCRzY29wZS5lcnIgPSBkYXRhLndoeVxuXHRcdCAgICAgICAgICAgIFx0JHNjb3BlLmhpZGVMb2FkaW5nKClcblx0XHQgICAgICAgIFx0XHQvLyAkc2NvcGUub3Blbk1vZGFsKCkgICAgXHRcblx0XHQgICAgICAgICAgICB9XG5cdFx0XHRcdH0pXG5cdFx0XHRcdC5lcnJvcihmdW5jdGlvbihkYXRhLCBzdGF0dXMsIGhlYWRlcnMsIGNvbmZpZykge1xuXHRcdFx0XHRcdCRzY29wZS5lcnIgPSBkYXRhLndoeVxuXHRcdFx0XHQgIFx0JHNjb3BlLmhpZGVMb2FkaW5nKClcblx0XHRcdFx0ICBcdC8vICRzY29wZS5vcGVuTW9kYWwoKVxuXHRcdFx0XHR9KTtcdCAgICAgICAgXG5cdFx0fVxuXG5cdFx0JHNjb3BlLnNob3dMb2FkaW5nID0gZnVuY3Rpb24obXNnKSB7XG5cdFx0ICAgICRpb25pY0xvYWRpbmcuc2hvdyh7XG5cdFx0ICAgICAgdGVtcGxhdGU6IG1zZ1xuXHRcdCAgICB9KTtcblx0XHRcdH07XG5cblx0XHQkc2NvcGUuaGlkZUxvYWRpbmcgPSBmdW5jdGlvbigpe1xuXHRcdCAgICAkaW9uaWNMb2FkaW5nLmhpZGUoKTtcblx0XHR9O1xuXHR9KVxuXG5cdC5jb250cm9sbGVyKCdMb2dpbkN0cmwnLCBmdW5jdGlvbigkc2NvcGUsICRodHRwLCAkbG9jYXRpb24sICAkd2luZG93LCAkaW9uaWNMb2FkaW5nLCAkaW9uaWNNb2RhbCl7XG5cblx0XHQkc2NvcGUuZXJyID0gJycvL2Vycm9yIG1lc3NhZ2UgXG5cblx0XHQvL21vZGFsIHNldHVwXG5cdFx0JGlvbmljTW9kYWwuZnJvbVRlbXBsYXRlVXJsKCdteS1tb2RhbC5odG1sJywge1xuXHRcdCAgICBzY29wZTogJHNjb3BlLFxuXHRcdCAgICBhbmltYXRpb246ICdzbGlkZS1pbi11cCdcblx0XHQgIH0pLnRoZW4oZnVuY3Rpb24obW9kYWwpIHtcblx0XHQgICAgJHNjb3BlLm1vZGFsID0gbW9kYWw7XG5cdFx0fSk7XG5cdFx0XG5cdFx0JHNjb3BlLm9wZW5Nb2RhbCA9IGZ1bmN0aW9uKCkge1xuXHRcdCAgICAkc2NvcGUubW9kYWwuc2hvdygpO1xuXHRcdH07XG5cdFx0XG5cdFx0JHNjb3BlLmNsb3NlTW9kYWwgPSBmdW5jdGlvbigpIHtcblx0XHQgICAgJHNjb3BlLm1vZGFsLmhpZGUoKTtcblx0XHR9O1xuXHRcdFxuXHRcdCRzY29wZS5zdWJtaXQgPSBmdW5jdGlvbih1c2VyKXtcblx0XHRcdHZhciB1cmwgPSAnL2F1dGgvbG9naW4nO1xuXHRcdFx0XHRcdFx0XG5cdFx0XHQvL21vZGFsIGxvYWRpbmdcblx0XHRcdCRzY29wZS5zaG93TG9hZGluZygnbG9hZGluZy4uLicpXG5cdFx0XHRcblx0XHRcdCRodHRwLnBvc3QodXJsLCB1c2VyKVxuXHRcdFx0XHQuc3VjY2VzcyhmdW5jdGlvbihkYXRhLCBzdGF0dXMsIGhlYWRlcnMsIGNvbmZpZykge1xuXHRcdFx0ICAgXHRcdGlmKGRhdGEub2sgPT09IHRydWUpIHtcblx0XHRcdCAgIFx0XHRcdC8vaGlkZSBtb2RhbCBsb2FkaW5nXG5cdFx0XHQgICBcdFx0XHQkc2NvcGUuaGlkZUxvYWRpbmcoKVxuXHRcdCAgICAgICAgICAgIFx0JGxvY2F0aW9uLnBhdGgoXCIvYWNjb3VudFwiKVxuXHRcdCAgICAgICAgICAgIH1lbHNle1xuXHRcdCAgICAgICAgICAgIFx0JHNjb3BlLmVyciA9IGRhdGEud2h5XG5cdFx0ICAgICAgICAgICAgXHQkc2NvcGUuaGlkZUxvYWRpbmcoKVxuXHRcdCAgICAgICAgXHRcdC8vICRzY29wZS5vcGVuTW9kYWwoKSAgICBcdFxuXHRcdCAgICAgICAgICAgIH1cblx0XHRcdFx0fSlcblx0XHRcdFx0LmVycm9yKGZ1bmN0aW9uKGRhdGEsIHN0YXR1cywgaGVhZGVycywgY29uZmlnKSB7XG5cdFx0XHRcdFx0JHNjb3BlLmVyciA9IGRhdGEud2h5XG5cdFx0XHRcdCAgXHQkc2NvcGUuaGlkZUxvYWRpbmcoKVxuXHRcdFx0XHQgIFx0Ly8gJHNjb3BlLm9wZW5Nb2RhbCgpXG5cdFx0XHRcdH0pO1x0ICAgICAgICBcblx0XHR9XG5cblx0XHQkc2NvcGUuc2hvd0xvYWRpbmcgPSBmdW5jdGlvbihtc2cpIHtcblx0XHQgICAgJGlvbmljTG9hZGluZy5zaG93KHtcblx0XHQgICAgICB0ZW1wbGF0ZTogbXNnXG5cdFx0ICAgIH0pO1xuXHRcdFx0fTtcblxuXHRcdCRzY29wZS5oaWRlTG9hZGluZyA9IGZ1bmN0aW9uKCl7XG5cdFx0ICAgICRpb25pY0xvYWRpbmcuaGlkZSgpO1xuXHRcdH07XHRcdFxuXG5cdH0pIiwibW9kdWxlLmV4cG9ydHMgPSBhbmd1bGFyLm1vZHVsZSgnbXlnYWxsZXJ5LnNlcnZpY2VzJywgW10pXG4iXX0=
