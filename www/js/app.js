// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers', 'starter.services', 'ngCordova', 'ion-floating-menu', 'ngCordovaOauth', 'chart.js', 'angular-d3plus'])

.run(function($ionicPlatform, $cordovaPush, $rootScope) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    var self = null;  // this is for ken setup

    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

      
    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
          
          
           // =======  push setup ====
           
              var androidConfig = {
				"senderID": "708325535298",
				
			  };  
             
             
            document.addEventListener("deviceready", function(){
				$cordovaPush.register(androidConfig).then(function(result) {
				  alert("success"+result);
				}, function(err) {
				  alert("errr"+err);
				})

				$rootScope.$on('$cordovaPush:notificationReceived', function(event, notification) {
				  switch(notification.event) {
					case 'registered':
					  if (notification.regid.length > 0 ) {
						alert('registration ID = ' + notification.regid);
						console.log(notification.regid);
					  }
					  break;

					case 'message':
					  // this is the actual push notification. its format depends on the data model from the push server
					  alert('message = ' + JSON.stringify(notification));
					  break;

					case 'error':
					  alert('GCM error = ' + notification.msg);
					  break;

					default:
					  alert('An unknown GCM event has occurred');
					  break;
				  }
				});

               }, false);
             //==== push setup == end ====
             
             // keen io setup start =====
             
             
                this.client = new Keen({
					projectId: "57ab11c8bcb79c32cbfc1f0a",
					readKey: "d06b3bc1a9e1aacb4bf598450c1b68b7649be0d63db11e4b8469c473a9aa7865e3f6042decc59e3d394fa866854d739775425c3fb8b89c9d50056aefc532e805103db03810cf1c52c33e8c1e8d03d54834cdd6e49402805c16c5f49409d36890",
					writeKey: "316c0173b697327b2c46d87c97ff69452fd7b0afe3954442ee54214f15e7dab1cfc20df1bf2348a7522f86efdc3b533a308cd1dc49f672ceb1110e5b966619a9302b198aeca379393900bb85698d87e64dd80c32d64c9decc6ed2de06cba95b1"
				});
				self = this;
             
             
             
             
             
             // ====keen setup End ==========
             //======admob code start=============

			  var admobid = {};
				// select the right Ad Id according to platform
				if( /(android)/i.test(navigator.userAgent) ) { 
					admobid = { // for Android
						banner: 'ca-app-pub-8371935087275211/8283570087',
						interstitial: 'ca-app-pub-8371935087275211~6806836889'
					};
					} 
			  if(window.AdMob) AdMob.createBanner( {
				  adId:admobid.banner, 
				  position:AdMob.AD_POSITION.BOTTOM_CENTER, 
				  autoShow:true
			  } );

             //=======AdMob Code End=======
             // sim details 
              window.plugins.sim.getSimInfo(succesCallback, errorCalback);
              
              function succesCallback(result) {
				  alert("Sim details = "+ JSON.stringify(result));
				}

				function errorCalback(error) {
				 //alert("error="+error);
				}
				
			 // device screen size get
           
           window.plugins.screensize.get(successCallback, errorCallback);
          
            function successCallback(result) {
			   
			  alert("screen size ="+ JSON.stringify(result));
			}
			function errorCallback(Error) {
			  console.log(Error);
			}
           	
				
				
				
            // note : phone number not show some time beacuse some vendor not show phone number
             
            var sound = device.platform == 'Android' ? 'file://sound.mp3' : 'file://beep.caf';
				var date = new Date();

				cordova.plugins.notification.local.schedule({
					id: 1,
					title: "Message Title",
					message: "Message Text",
					at: date,
					sound: sound,
					icon: "img/ionic.png"
				});
				
			// check location availibility and detect location on off action
			         
			
			     cordova.plugins.diagnostic.getLocationAuthorizationStatus(function(status){
						switch(status){
							case cordova.plugins.diagnostic.permissionStatus.NOT_REQUESTED:
								console.log("Permission not requested");
								break;
							case cordova.plugins.diagnostic.permissionStatus.GRANTED:
								console.log("Permission granted");
								break;
							case cordova.plugins.diagnostic.permissionStatus.DENIED:
								console.log("Permission denied");
								break;
							case cordova.plugins.diagnostic.permissionStatus.DENIED_ALWAYS:
								console.log("Permission permanently denied");
								break;
						}
					}, function(error){
						console.error(error);
					});
			
			
							 cordova.plugins.diagnostic.isLocationAvailable(function(available){
								console.log("Location is " + (available ? "available" : "not available"));
							}, function(error){
								console.error("The following error occurred: "+error);
							});	
					
					
						// open device location setting direct 
						cordova.plugins.diagnostic.switchToLocationSettings();

							cordova.plugins.diagnostic.registerLocationStateChangeHandler(function(state){
								console.log("Location state changed to : " + state);
							});	
					
			// end code of location setting
			
			// use diagnostic plugin use for status check and change wifi setting, data connection, bluetooth, battery etc
			
		
			
				

  });
})

.config(function($stateProvider, $urlRouterProvider, $cordovaAppRateProvider, ChartJsProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider

  // setup an abstract state for the tabs directive
    .state('tab', {
    url: '/tab',
    abstract: true,
    templateUrl: 'templates/tabs.html'
  })

  // Each tab has its own nav history stack:

  .state('tab.dash', {
    url: '/dash',
    views: {
      'tab-dash': {
        templateUrl: 'templates/tab-dash.html',
        controller: 'DashCtrl'
      }
    }
  })

  .state('tab.chats', {
      url: '/chats',
      views: {
        'tab-chats': {
          templateUrl: 'templates/tab-chats.html',
          controller: 'ChatsCtrl'
        }
      }
    })
    .state('tab.chat-detail', {
      url: '/chats/:chatId',
      views: {
        'tab-chats': {
          templateUrl: 'templates/chat-detail.html',
          controller: 'ChatDetailCtrl'
        }
      }
    })

  .state('tab.account', {
    url: '/account',
    views: {
      'tab-account': {
        templateUrl: 'templates/tab-account.html',
        controller: 'AccountCtrl'
      }
    }
    
  });

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/tab/dash');

    document.addEventListener("deviceready", function () {

   var prefs = {
     language: 'en',
     appName: 'ionicAll',
     iosURL: '<my_app_id>',
     androidURL: 'market://details?id=com.ionicframework.ionicall744361',
     windowsURL: 'ms-windows-store:Review?name=<...>'
   };

   $cordovaAppRateProvider.setPreferences(prefs)

 }, false);

 ChartJsProvider.setOptions({
      chartColors: ['#FF5252', '#FF8A80'],
      responsive: false
    });
    // Configure all line charts 
    ChartJsProvider.setOptions('line', {
      showLines: false
    });

})

.directive('fakeStatusbar', function() {
  return {
    restrict: 'E',
    replace: true,
    template: '<div class="fake-statusbar"><div class="pull-left">Carrier</div><div class="time">3:30 PM</div><div class="pull-right">50%</div></div>'
  }
});
