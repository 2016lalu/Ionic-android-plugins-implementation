angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope, $timeout, $http) {
	
	

	
	    $scope.labels = ["January", "February", "March", "April", "May", "June", "July"];

			$scope.series = ['Series A', 'Series B'];

			$scope.data = [

				[65, 59, 80, 81, 56, 55, 40],

				[28, 48, 40, 19, 86, 27, 90]

			];
 
 
       // rss feed and blogs code start -------
            // dainik bhasker news -- http://www.bhaskar.com/rssfeedtopnews
            // time of india -- http://timesofindia.indiatimes.com/rssfeeds/2886704.cms
            // times of india delhi news --http://timesofindia.indiatimes.com/rssfeeds/-2128839596.cms
            // developer news -- https://www.thepolyglotdeveloper.com/feed/
            // india to day -----http://indiatoday.intoday.in/rss/homepage-topstories.jsp
			$scope.init = function() {
			$http.get("http://ajax.googleapis.com/ajax/services/feed/load", { params: { "v": "1.0", "q": "http://blog.ionic.io/feed/" } })
				.success(function(data) {
					$scope.rssTitle = data.responseData.feed.title;
					$scope.rssUrl = data.responseData.feed.feedUrl;
					$scope.rssSiteUrl = data.responseData.feed.link;
					$scope.entries = data.responseData.feed.entries;
					console.log($scope.entries);
				})
				.error(function(data) {
					console.log("ERROR: " + data);
				});
			}
			
			$scope.browse = function(v) {
					window.open(v, "_system", "location=yes");
				}
	
	   // code end -----
	
	})

.controller('ChatsCtrl', function($scope, Chats, $http, $cordovaPrinter, $cordovaCapture, $cordovaPinDialog, $cordovaAppRate, $cordovaKeyboard, $cordovaProgress, $cordovaGlobalization, $cordovaFileOpener2,  $cordovaImagePicker, $cordovaAppAvailability,  $cordovaToast, $cordovaAppVersion, $cordovaActionSheet, $cordovaStatusbar, $cordovaVibration, $cordovaSpinnerDialog, $cordovaGoogleAnalytics, $cordovaGeolocation, $interval, $cordovaFlashlight, $cordovaZip, $cordovaSplashscreen, $cordovaSocialSharing, $cordovaInstagram, $cordovaEmailComposer, $cordovaOauth) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});
  
	
		
  
  $scope.chats = Chats.all();
  $scope.remove = function(chat) {
    Chats.remove(chat);
  };
  
       //$cordovaGoogleAnalytics.debugMode();
	  // $cordovaGoogleAnalytics.startTrackerWithId('UA-81196033-1');
	   //$cordovaGoogleAnalytics.setUserId('126137147');
  
  
   $scope.googleAnalytics = function(){
	   
	 $cordovaGoogleAnalytics.trackView('List Screen');
	 $cordovaGoogleAnalytics.addTransaction('1234', 'Acme Clothing', '11.99', '5', '1.29', 'EUR');
	
	
	}
   
    // ==keen analytics
     $scope.onButtonClick = function() {
       
        var eventData = {
            color: "red",
            device: device,
            timestamp: new Date(),
			 created_at: new Date()
        };
         self.client.addEvent("button clicks", eventData, function(err, res) {
            if (err) {
                console.log("Error: " + err);
            }
            else {
                console.log("Event sent.");
            }

         
        });
    }
 
  
  
    $scope.geoLocation = function(){
		
		
		var posOptions = {timeout: 10000, enableHighAccuracy: false};
		  $cordovaGeolocation
			.watchPosition(posOptions) // can use "getCurrentPosition" but device location changes not auto update
			.then(function (position) {
			  var lat  = position.coords.latitude
			  var long = position.coords.longitude
			  console.log(lat);
			  
			      var geocoder = new google.maps.Geocoder();
				  var latlng = new google.maps.LatLng(lat, long);
				  var request = {
					latLng: latlng
				  };
			  
			  
			   geocoder.geocode(request, function(data, status) {
				if (status == google.maps.GeocoderStatus.OK) {
				  if (data[0] != null) {
					alert("address is: " + data[0].formatted_address);
				  } else {
					alert("No address available");
				  }
				}
			  });
			  
			}, function(err) {
			    alert(JSON.stringify(err));
			  // error
			});
	
	}
    
     $scope.pinDailog = function(){
		        var correctPassword = "1337";

		         $cordovaPinDialog.prompt('Some message here').then(function(result) {

						if(result.input1 === correctPassword) {

							alert("The correct password was entered");

						} else {

							alert("Incorrect password enetered");

						}

					}, function (error) {

						console.error(error);

					});
		 
		 
		 
		}
    
     $scope.offlineLocation = function(){
		
		 $interval(function(){
			var geoSettings = {frequency: 30000, timeout: 100000,enableHighAccuracy: false};
			var geo = $cordovaGeolocation.getCurrentPosition(geoSettings);
			geo.then(function (position) {
					$scope.latitude = position.coords.latitude;
					$scope.longitude = position.coords.longitude;
					alert($scope.longitude);
				},
				function error(err) {
					$scope.errors = err;
					 alert(err);
				}
			);
		 },30000);

		
		
		 
	}
    
    $scope.fileOpener = function(){




		         $cordovaFileOpener2.appIsInstalled('com.adobe.reader').then(function(res) {
				      if (res.status === 0) {
				      	alert("reader is available");  // Adobe Reader is not installed.
				      } else {
				          // Adobe Reader is installed.
				          alert("reader is not  available");
				      }
				  });




              $cordovaFileOpener2.open(
			    '/sdcard/Download/testing.pdf',
			    'application/pdf'
			  ).then(function(succ) {
			     alert("successfully open");
			     console.log(succ);
			  }, function(err) {
			  	 alert("error"+ JSON.stringify(err));
			      // An error occurred. Show a message to the user
			  });


    }


   $scope.globalization = function(){

           $cordovaGlobalization.getPreferredLanguage().then(
			    function(result) {
			       alert("getPreferredLanguage ="+JSON.stringify(result));
			    },
			    function(error) {
			    	 alert("error ="+JSON.stringify(error));
			      // error
			  });

			  $cordovaGlobalization.getLocaleName().then(
			    function(result) {
			    	alert("getLocaleName ="+JSON.stringify(result));
			      // result
			    },
			    function(error) {
			    	 alert("error ="+JSON.stringify(error));
			      // error
			  });

			  $cordovaGlobalization.getFirstDayOfWeek().then(
			    function(result) {
			    	alert("getFirstDayOfWeek ="+JSON.stringify(result));
			      // result
			    },
			    function(error) {
			      // error
			      alert("error ="+JSON.stringify(error));
			  });


   }


  
   $scope.scan = function(){
			 alert();
			cordova.plugins.barcodeScanner.scan(
				  function (result) {
					 
					  alert("We got a barcode\n" +
							"Result: " + result.text + "\n" +
							"Format: " + result.format + "\n" +
							"Cancelled: " + result.cancelled);
						
						
				  }, 
				  function (error) {
					 
				  },
				  {
					  "preferBackCamera" : true, // iOS and Android
					  "showFlipCameraButton" : true, // iOS and Android
					  "prompt" : "Place a barcode inside the scan area", // supported on Android only
					  "formats" : "QR_CODE,PDF_417,DATA_MATRIX,AZTEC,UPC_E,UPC_A,EAN_8,EAN_13,CODE_128,CODE_39,CODE_93,CODABAR,ITF,RSS14,RSS_EXPANDED", // default: all but PDF_417 and RSS_EXPANDED
					  "orientation" : "portrait" // Android only (portrait|landscape), default unset so it rotates with the device
				  }
			   );
			 
            }	 
  
  
        $scope.printer = function(){
			 alert();
			 var printerAvail = $cordovaPrinter.isAvailable()

			  var doc = "<html> ... </html>";
			  $cordovaPrinter.print(doc)
			
	    }
      
       $scope.keyBoard = function(){



       	 $cordovaKeyboard.hideAccessoryBar(true)

		  $cordovaKeyboard.disableScroll(true)

		  $cordovaKeyboard.close()

		  var isVisible = $cordovaKeyboard.isVisible()
       }
 
   

       $scope.captureImage = function() {
		   
				 // caapture iamge
				var options = { limit: 3 };

				$cordovaCapture.captureImage(options).then(function(imageData) {
				  // Success! Image data is here
				  console.log(imageData);
				}, function(err) {
					console.log(err);
				  // An error occurred. Show a message to the user
				});
			
		  }
  
        $scope.captureVideo = function() {
		   
		     // capture video
		
				var options = { limit: 3, duration: 15 };

				$cordovaCapture.captureVideo(options).then(function(videoData) {
				  // Success! Video data is here
				  console.log(videoData);
				}, function(err) {
					 console.log(err);
				  // An error occurred. Show a message to the user
				});
			
			
			
		  }
		  $scope.captureAudio = function() {
		   
		    var options = { limit: 3, duration: 10 };

				$cordovaCapture.captureAudio(options).then(function(audioData) {
					
				   console.log(audioData);
				 
				}, function(err) {
					 console.log(err);
				  // An error occurred. Show a message to the user
				});
			
		  }
  
  
  
        $scope.flashON = function(){
			
			 $cordovaFlashlight.switchOn()
            .then(
			  function (success) { console.log(success); },
			  function (error) { console.log(error); });
			  
	    }
	    
	    $scope.flashOff = function(){
			
			 $cordovaFlashlight.switchOff()
			 .then(
			  function (success) { console.log(success);},
			  function (error) { console.log(error); });
			  
	    }
  
    $scope.appRating = function(){    
       document.addEventListener("deviceready", function () {

		    $cordovaAppRate.promptForRating(true).then(function (result) {
		         alert("succes"+JSON.stringify(result));
		    });
		  }, false);


    }


       $scope.Unzip = function(){
		   
		  $cordovaZip
			.unzip(
			  src, // https://github.com/MobileChromeApps/zip/blob/master/tests/tests.js#L32
			  dest // https://github.com/MobileChromeApps/zip/blob/master/tests/tests.js#L45
			).then(function () {
			  console.log('success');
			}, function () {
			  console.log('error');
			}, function (progressEvent) {
			  // https://github.com/MobileChromeApps/zip#usage
			  console.log(progressEvent);
			});
		 
		}
   
        $scope.splaceScreen = function(){
			
	      $cordovaSplashscreen.show();
	    }
   
   
        $scope.toast = function(){
			
			 $cordovaToast.showLongBottom('Here is a message').then(function(success) {
              // success
			  }, function (error) {
				// error
			  });
			$cordovaGoogleAnalytics.trackView('toast Screen');
	    }
	    $scope.vibration = function(){
			
			 $cordovaVibration.vibrate(100);
			 $cordovaSpinnerDialog.show("title","message", true);
	    }
	    
	    
	    
	    
	     $scope.actionsheet = function(){
			
			 var options = {
				title: 'What do you want with this image?',
				buttonLabels: ['Share via Facebook', 'Share via Twitter', 'Shared via Whatsapp'],
				addCancelButtonWithLabel: 'Cancel',
				androidEnableCancelButton : true,
				winphoneEnableCancelButton : true,
				addDestructiveButtonWithLabel : 'Delete it'
			  };

 
			  document.addEventListener("deviceready", function () {

				$cordovaActionSheet.show(options)
				  .then(function(btnIndex) {
					var index = btnIndex;
					console.log(btnIndex);
				  });
			  }, false);
	    }
    
  
       $scope.statusBar = function(){
		 
		   $cordovaStatusbar.overlaysWebView(true);

			  // styles: Default : 0, LightContent: 1, BlackTranslucent: 2, BlackOpaque: 3
			  $cordovaStatusbar.style(0);

			  // supported names: black, darkGray, lightGray, white, gray, red, green,
			  // blue, cyan, yellow, magenta, orange, purple, brown
			  $cordovaStatusbar.styleColor('purple');

			  $cordovaStatusbar.styleHex('#000');

			  //$cordovaStatusbar.hide();

			  $cordovaStatusbar.show();

			  //var isVisible = $cordovaStatusbar.isVisible();

	    }   

        $scope.imagePicker = function(){



                      var options = {
						   maximumImagesCount: 10,
						   width: 800,
						   height: 800,
						   quality: 80
						  };

						  $cordovaImagePicker.getPictures(options)
						    .then(function (results) {
						      for (var i = 0; i < results.length; i++) {
						        console.log('Image URI: ' + results[i]);
						      }
						    }, function(error) {
						      // error getting photos
						    });



        }
    


         $scope.emailComposer = function(){


         	$cordovaEmailComposer.isAvailable().then(function() {
                alert("is available");
			 }, function () {
			     alert("is not available");
			 });

		    
             var email = {
			    to: 'tyagilaluprashad4@gmail.com',
			    cc: 'laluprasad.tyagi@yahoo.com',
			    bcc: ['john@doe.com', 'jane@doe.com'],
			    attachments: [
			      'file://img/logo.png',
			      'res://icon.png',
			      'base64:icon.png//iVBORw0KGgoAAAANSUhEUg...',
			      'file://README.pdf'
			    ],
			    subject: 'Cordova Icons',
			    body: 'How are you? Nice greetings from Leipzig',
			    isHtml: true
			  };

			 $cordovaEmailComposer.open(email)

	    }
     
        $scope.githubOauth = function(value){

                       //$cordovaOauth.github(string clientId, string clientSecret, array appScope);
           $cordovaOauth.github('a3babdb8675f1515345f', 'd1abf27ebccd11d15c03912422bd9f895f3c6ae0', ['laluprasad.tyagi@yahoo.com']).then(function(result) 
            {
             
             console.log(result);

            }, function(error) {
            	  console.log(error);
            // error
            });
			
		}
	   $scope.googleOauth = function(value){

                       //$cordovaOauth.github(string clientId, string clientSecret, array appScope);
           $cordovaOauth.google("709452169694-cnrn3nqv7a08dq510aokcrs2b36a717e.apps.googleusercontent.com", ["https://www.googleapis.com/auth/plus.me", "https://www.googleapis.com/auth/userinfo.email", "https://www.googleapis.com/auth/userinfo.profile"]).then(function(result) 
            {
             
             console.log(result);

                      if($scope.access_token !== "") {
					     
					      $http.get('https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token='+result.access_token).then(function(result) { 
					        
                           var profile = {"name":result.data.name, "gender":result.data.gender, "image":result.data.picture, "email":result.data.email}
					            
					           	console.log(profile);				            
					           
					            }, function(error) {
					               
					                console.log(JSON.stringify(error));
					            });
					    } 

            }, function(error) {
            	  console.log(error);
            // error
            });
			
		}

        $scope.meetupOauth = function(value){

                       //$cordovaOauth.meetup(string consumerKey);
           $cordovaOauth.meetup("s26d16uupvdf2hnvhgbl05kpk5").then(function(result) 
            {
             
             console.log(result);
                   

               if(result.access_token !== "") {
					     
					      $http.get('https://api.meetup.com/2/member/self?access_token='+result.access_token).then(function(result) { 

					        console.log(result);
                           var profile = {"name":result.data.name, "gender":result.data.gender, "image":result.data.picture, "email":result.data.email}
					            
					           	console.log(profile);				            
					           
					            }, function(error) {
					               
					                console.log(JSON.stringify(error));
					            });
					    } 

                     
            }, function(error) {
            	  console.log(error);
            // error
            });
			
		}




		  $scope.facebookLogin = function(){





				    $cordovaOauth.facebook("871754166302702", ["email", "public_profile"], {redirect_uri: "http://localhost/callback"}).then(function(result){
				        
				        console.log(result);
                          $http.get("https://graph.facebook.com/v2.2/me", {params: {access_token: result.access_token, fields: "name,gender,location,picture", format: "json" }}).then(function(result) {
					        
					        console.log(result);
  					        var name = result.data.name;
					        var gender = result.data.gender;
					        var picture = result.data.picture;

					       
					      
					    }, function(error) {
					        alert("Error: " + error);
					    });


				    },  function(error){
				           console.log(error);
				    });

		}		




       $scope.foursquareLogin = function(){


				    $cordovaOauth.foursquare("RJVFCFLI3B2OGJCRFMDH5KSGANIGMVF4DBLIHPTYHX0H1KKE").then(function(result){
				        
				        console.log(result);

                            $http.get('').then(function(result) {
					        
					        console.log(result);
  					      
					      
					    }, function(error) {
					        console.log(error);
					    });



  


                         
				    },  function(error){
				           console.log(error);
				    });

		}		







	    $scope.socialSharing = function(value){

             switch (value) {
	            case 1 :
	                   
                       $cordovaSocialSharing
					    .shareViaFacebook("hello", 'http://lptyagi.comxa.com/') // shareViaFacebook(message, image, link)
					    .then(function(result) {
					      
					      console.log(result);
					    }, function(err) {
					    	console.log(err);
					      // An error occurred. Show a message to the user
					    });

                       


	                break;
	            case 2 :
	               
                              $cordovaSocialSharing
								 .shareViaWhatsApp("hello") //.shareViaWhatsApp("hello", image, link)
								 .then(function(result) {
									 console.log(result);
								  // Success!
								}, function(err) {
									console.log(err);
								  // An error occurred. Show a message to the user
								});




	                break;
	            case 3 :
	                   
                         $cordovaSocialSharing
						    .shareViaEmail("hello testing", "share testing", "laluprasad.tyagi@yahoo.com") //shareViaEmail(message, subject, toArr, ccArr, bccArr, file)
						    .then(function(result) {
						      // Success!
						       console.log(result);
						    }, function(err) {
						    	 console.log(err);
						      // An error occurred. Show a message to the user
						    });

	                break;
	            case 4 :
	                 
                        $cordovaInstagram.share("hello insta").then(function(result) {
						   
                               console.log(result);
						 }, function(err) {
						    
						     console.log(err);
						});



	                break;
	            case 5 :
	                   
                           $cordovaSocialSharing
						    .shareViaTwitter("hello twitter") //shareViaTwitter(message, image, link)
						    .then(function(result) {
						      // Success!
						       console.log(result);
						    }, function(err) {
						    	 console.log(err);
						      // An error occurred. Show a message to the user
						    });



	                break;
	            default:

	        }

			
		}

       $scope.appAvailibility = function(){

          
       
			  document.addEventListener("deviceready", function () {

			    $cordovaAppAvailability.check('com.twitter.android')
			      .then(function() {
			        
			        alert("twitter App Available");
			      }, function () {
			      	alert("twitter App not Available");
			        // not available
			      });

                 $cordovaAppAvailability.check('com.whatsapp')
			      .then(function() {
			        
			        alert("whatsapp App Available");
			      }, function () {
			      	alert("whatsapp App not Available");
			        // not available
			      });

                 $cordovaAppAvailability.check('com.facebook.katana')
			      .then(function() {
			        
			        alert("Facebook App Available");
			      }, function () {
			      	alert("Facebook App not Available");
			        // not available
			      });



			  }, false);

      

       }




     $scope.progressBar = function(){


             $cordovaProgress.showSimple(true)  // requires .hide()

				$cordovaProgress.showSimpleWithLabel(true, "Loading") // .hide()

				$cordovaProgress.showSimpleWithLabelDetail(true, "Loading", "detail")
				    // requires .hide()

				$cordovaProgress.hide()


				$cordovaProgress.showDeterminate(false, 100000)

				$cordovaProgress.showDeterminateWithLabel(true, 50000, "Loading")

				$cordovaProgress.showAnnular(true, 50000)

				$cordovaProgress.showAnnularWithLabel(false, 100000, "Loading")

				$cordovaProgress.showBar(true, 50000)

				$cordovaProgress.showBarWithLabel(false, 100000, "Loading")


				$cordovaProgress.showSuccess(true, "Success!") // requires .hide()

				$cordovaProgress.showText(false, 100000, "Loading")

     }



	   
  
})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
  
  
  
})

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
  
  $scope.charttype="bar";


        $scope.base_data = [
          {"year": 1991, "name":"alpha", "value": 15, "group": "black"},
          {"year": 1991, "name":"beta", "value": -10, "group": "black"},
          {"year": 1991, "name":"gamma", "value": 5, "group": "black"},
          {"year": 1991, "name":"delta", "value": -50, "group": "black"},
          {"year": 1992, "name":"alpha", "value": 20, "group": "black"},
          {"year": 1992, "name":"beta", "value": -10, "group": "black"},
          {"year": 1992, "name":"gamma", "value": 10, "group": "black"},
          {"year": 1992, "name":"delta", "value": -43, "group": "black"},
          {"year": 1993, "name":"alpha", "value": 30, "group": "black"},
          {"year": 1993, "name":"beta", "value": -40, "group": "black"},
          {"year": 1993, "name":"gamma", "value": 20, "group": "black"},
          {"year": 1993, "name":"delta", "value": -17, "group": "black"},
          {"year": 1994, "name":"alpha", "value": 60, "group": "black"},
          {"year": 1994, "name":"beta", "value": -60, "group": "black"},
          {"year": 1994, "name":"gamma", "value": 25, "group": "black"},
          {"year": 1994, "name":"delta", "value": -32, "group": "black"}
        ];

        $scope.bubbles_data = [
          {"value": 100, "name": "alpha", "group": "group 1"},
          {"value": 70, "name": "beta", "group": "group 2"},
          {"value": 40, "name": "gamma", "group": "group 2"},
          {"value": 15, "name": "delta", "group": "group 2"},
          {"value": 5, "name": "epsilon", "group": "group 1"},
          {"value": 1, "name": "zeta", "group": "group 1"}
        ];

        $scope.geo_data = [
          {"value": 2315987123, "country": "eufra", "name": "France"},
          {"value": 38157121349, "country": "euprt", "name": "Portugal"},
          {"value": 21891735098, "country": "euesp", "name": "Spain"},
          {"value": 9807134982, "country": "euita", "name": "Italy"}
        ];


        $scope.network_data = [
          {"name": "alpha", "size": 10},
          {"name": "beta", "size": 12},
          {"name": "gamma", "size": 30},
          {"name": "delta", "size": 26},
          {"name": "epsilon", "size": 12},
          {"name": "zeta", "size": 26},
          {"name": "theta", "size": 11},
          {"name": "eta", "size": 24}
        ];
        $scope.network_positions = [
          {"name": "alpha", "x": 10, "y": 15},
          {"name": "beta", "x": 12, "y": 24},
          {"name": "gamma", "x": 16, "y": 18},
          {"name": "delta", "x": 26, "y": 21},
          {"name": "epsilon", "x": 13, "y": 4},
          {"name": "zeta", "x": 31, "y": 13},
          {"name": "theta", "x": 19, "y": 8},
          {"name": "eta", "x": 24, "y": 11}
        ];
        $scope.network_connections = [
          {"source": "alpha", "target": "beta"},
          {"source": "alpha", "target": "gamma"},
          {"source": "beta", "target": "delta"},
          {"source": "beta", "target": "epsilon"},
          {"source": "zeta", "target": "gamma"},
          {"source": "theta", "target": "gamma"},
          {"source": "eta", "target": "gamma"}
        ];



        $scope.sample_data = [
          {"name": "alpha", "skill": "power", "value": 4},
          {"name": "alpha", "skill": "courage", "value": 8},
          {"name": "alpha", "skill": "wisdom", "value": 2},
          {"name": "beta", "skill": "power", "value": 5},
          {"name": "beta", "skill": "courage", "value": 4},
          {"name": "beta", "skill": "wisdom", "value": 6}
        ];


        $scope.rings_edges = [
          {"source": "alpha", "target": "beta"},
          {"source": "alpha", "target": "gamma"},
          {"source": "beta", "target": "delta"},
          {"source": "beta", "target": "epsilon"},
          {"source": "zeta", "target": "gamma"},
          {"source": "theta", "target": "gamma"},
          {"source": "eta", "target": "gamma"}
        ];

        $scope.sankey_nodes = [
          {"id": "alpha"},
          {"id": "beta"},
          {"id": "gamma"}
        ];


        $scope.sankey_edgesvalue = [
          {"strength": 2, "source": 0, "target": 2},
          {"strength": 1, "source": 1, "target": 2},
          {"strength": 1, "source": 2, "target": 0},
          {"strength": 3, "source": 2, "target": 1}
        ];

        $scope.sankey_edges = {'strength': 'strength', 'value': $scope.sankey_edgesvalue};


        $scope.scatter_data = [
          {"value": 100, "weight": .45, "type": "alpha"},
          {"value": 70, "weight": .60, "type": "beta"},
          {"value": 40, "weight": -.2, "type": "gamma"},
          {"value": 15, "weight": .1, "type": "delta"}
        ];

        $scope.table_data = [
          {"index":"a", "foo":20, "bar":5, "baz":77},
          {"index":"b", "foo":2, "bar":20},
          {"index":"c", "foo":94, "bar":55, "baz":101},
          {"index":"d", "bar":95, "baz":82}
        ];

  
  
  
  
});
