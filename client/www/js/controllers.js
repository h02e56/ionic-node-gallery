var config = require('./config')
var urls = config.urls;

module.exports = angular.module('mygallery.controllers', [])

	.controller('AccountCtrl', function($scope, $http, $cordovaCamera, $cordovaFileTransfer) {

		$scope.message = ''

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
					img.src = "data:image/jpeg;base64," + imageData;
					// image.style="display:inline-block"
					gallery.appendChild(image)

					uploadPhoto(imageData)
					
				}, function (err) {
					alert(err)
				});
		    }


		     //upload to server
		    function uploadPhoto(data) {	
		    	var url = urls.upload;
		    	alert(url)
		  	
	  		// 	var uploadOptions = new FileUploadOptions();
					// uploadOptions.fileKey = "file";
					// uploadOptions.fileName = data.substr(data.lastIndexOf('/') + 1);
					// uploadOptions.mimeType = "image/jpeg";
					// uploadOptions.chunkedMode = false;

					// $cordovaFile.uploadFile(url, data, uploadOptions).then(function(result) {
					// 		// Success!
					// 		alert(result)
					// 	}, function(err) {
					// 		alert(err)
					// 	})
					// ;

		  //   	var formData = {
		  //   		file: {
		  //   			value: new Buffer(data, 'base64'),
		  //   			options:{
		  //   				contentType: 'image/jpg'
		  //   			}
		  //   		}
		  //   	}
				// request({url: url, formData: formData}, function optionalCallback(err, httpResponse, body) {
				// 	if (err) {
				//     	return alert('upload failed:', err);
				//   	}
				//   	alert('Upload successful!' + body);
				//   	$scope.message = body
				// });    	

		    // 	var filePath = $scope.picData;//path to current image
			   //  var trustHosts = true;
			   //  var options = {};
			           
			  	// $cordovaFileTransfer.upload(url, filePath, options, trustHosts)
				  //   .then(function(result) {
				  //       // Success!
				  //       alert(result)
				  //   }, function (err) {
				  //    	alert(err)
				  //   }, function (progress) {
				  //       // constant progress updates
				  //   });

			  	// }, false);
		    }
		});

		//get current gallery
		$http.get(urls.gallery)
			.success(function(data, status, headers, config) {
				if(data.ok === true) {
		   			//hide modal loading
		   			// $scope.hideLoading()
	            	$scope.items = data.data
	            	$scope.apply()
	            }else{
	            	// $scope.err = data.why
	            	
	        		// $scope.openModal()    	
	            }
			})
			.error(function(data, status, headers, config) {
				alert(data.why)
				
				  	// $scope.openModal()
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
			var url = urls.register
						
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
		 var url = urls.login
						
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