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