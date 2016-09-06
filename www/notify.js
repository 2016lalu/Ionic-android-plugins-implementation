
/*var gcm = require('node-gcm');
var message = new gcm.Message();
 
//API Server Key
var sender = new gcm.Sender('AIzaSyDzOpwcsyxewkjsLHgT9Fh-dYsyEJZA0Fg'); //api key of google console developer project key
var registrationIds = [];
 
// Value the payload data to send...
message.addData('message',"Ionic + cordova push testing!");
message.addData('title','Push Notification Sample' );
message.addData('msgcnt','3'); // Shows up in the notification in the status bar
message.addData('soundname','beep.wav'); //Sound to play upon notification receipt - put in the www folder in app
//message.collapseKey = 'demo';
//message.delayWhileIdle = true; //Default is false
message.timeToLive = 3000;// Duration in seconds to hold in GCM and retry before timing out. Default 4 weeks (2,419,200 seconds) if not specified.
 
// At least one reg id required 
 // registration id get when app start 
registrationIds.push('APA91bGlWs-0Pu-yl8EgQbVVndDg7x63cMiCK-p_wSiLdu7lesjt6u6Q7xec06G4mD58wurLnEirML6_2CCXeYCvDyJ48EwcncW-rOScoh_dYdZbrE2jc7vtkQn_AaCsQTD0i4bMnMxa7oEqMDlWtvwLkbBzWf_R-Q');
 

// Parameters: message-literal, registrationIds-array, No. of retries, callback-function
 
sender.send(message, registrationIds, 4, function (result) {
    console.log(result);
});

*/


// for picture notification

var gcm = require('node-gcm');
// Replace these with your own values.
var apiKey = "AIzaSyDzOpwcsyxewkjsLHgT9Fh-dYsyEJZA0Fg";
var deviceID = "APA91bGlWs-0Pu-yl8EgQbVVndDg7x63cMiCK-p_wSiLdu7lesjt6u6Q7xec06G4mD58wurLnEirML6_2CCXeYCvDyJ48EwcncW-rOScoh_dYdZbrE2jc7vtkQn_AaCsQTD0i4bMnMxa7oEqMDlWtvwLkbBzWf_R-Q";
var service = new gcm.Sender(apiKey);
var message = new gcm.Message({
        collapseKey: 'demo',
        priority: 'normal',
        contentAvailable: false,
        delayWhileIdle: false,
        timeToLive: 3,
         data: {
         "title": "Big Picture",
        "message": "This is my big picture message",
        "style": "picture",
        "picture": "img/ben.png",
        "summaryText": "The internet is built on cat pictures"
        }

    });



service.send(message, { registrationTokens: [ deviceID ] }, function (err, response) {
    if(err) console.error(err);
    else    console.log(response);
});
