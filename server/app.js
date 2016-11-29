var admin = require("firebase-admin");

admin.initializeApp({
  credential: admin.credential.cert("certs/lab-firebase-aefba-firebase-adminsdk-0n4ed-ff41738641.json"),
  databaseURL: "https://lab-firebase-aefba.firebaseio.com"
});

// As an admin, the app has access to read and write all data, regardless of Security Rules
var db = admin.database();

// Notifications
var notification_ref = db.ref("nsendNotifications");

notification_ref.on("child_added", function(snapshot, prevChildKey) {
	var newNotification = snapshot.val();

	console.log(snapshot.val());

	console.log('New notification available');
	console.log("Message: " + newNotification.msg);
	console.log("From: " + newNotification.from);
	console.log("To: " + newNotification.to);
	
	var fcmTokens_ref = db.ref("fcmTokens"+'/'+newNotification.to).once('value').then(function(snapshot) {
 	  var targetFCMTokens = snapshot.val().tokens;
	  console.log("Target's FCM tokens:" + targetFCMTokens);

	  var form = {
	    "notification": {
	    	"title": "Teamform: you have a new notification",
	    	"body": newNotification.msg,
	    	"icon": "img/launcher-icon-2x.png",
	    	"click_action": "https://lab-firebase-aefba.firebaseapp.com"
	  	},
	  	"to": targetFCMTokens
	  };
	  console.log(newNotification.msg);

		require("request")({                 
		  method: 'POST',             
		  uri: 'https://fcm.googleapis.com/fcm/send',
		  json: form,
		  headers: {               
		    'Authorization': 'key=AAAAbZuP-Y0:APA91bGUCFODMy0WSF7i8PpQU_iQ8GyfKtOBl36cYh5pbLiN9Jm61DTCfWMypys0XcqPzOz6jm4q_Itz97QtzAfC5OFNBocmTyg_WvuKNYvLBJyUCtSFfbJtUJZsaO1hlZKLnsAtLiHI3ZDmACoLtWSHztaQKtlsqg',
		    'Content-Type': 'application/json'
		  }
		}, function(error, response, body) {  
			//console.log(response);
		  if (!error && response.statusCode == 200) {
		    // console.log(body) // Show the HTML for the Google homepage.
		  }else{
		  	console.log(error);
		  }
		});

	});

});
