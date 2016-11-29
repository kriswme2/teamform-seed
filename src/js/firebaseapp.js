// Initialize Firebase
var config = {
  apiKey: "AIzaSyBKPa_aZAr7C23kkYli_wPPSH069aYLRIM",
  authDomain: "lab-firebase-aefba.firebaseapp.com",
  databaseURL: "https://lab-firebase-aefba.firebaseio.com",
  storageBucket: "lab-firebase-aefba.appspot.com",
  messagingSenderId: "470761339277"
};
firebase.initializeApp(config);


window.onload = function() {
// Retrieve Firebase Messaging object.
var messaging = firebase.messaging();

messaging.requestPermission()
.then(function() {
  console.log('Notification permission granted.');
  // TODO(developer): Retrieve an Instance ID token for use with FCM.
  // ...
})
.catch(function(err) {
  console.log('Unable to get permission to notify.', err);
});

// // Get Instance ID token. Initially this makes a network call, once retrieved
// // subsequent calls to getToken will return from cache.
// messaging.getToken()
// .then(function(currentToken) {
//   if (currentToken) {
//     //sendTokenToServer(currentToken);
//     //updateUIForPushEnabled(currentToken);

//     console.log(currentToken);

//     var userId = firebase.auth().currentUser.uid;
//     firebase.database().ref('fcmTokens'+'/'+userId).set({
//     	tokens: currentToken	
//     });
		
//   } else {
//     // Show permission request.
//     console.log('No Instance ID token available. Request permission to generate one.');
//     // Show permission UI.
//     // updateUIForPushPermissionRequired();
//     // setTokenSentToServer(false);
//   }
// })
// .catch(function(err) {
//   console.log('An error occurred while retrieving token. ', err);
//   // setTokenSentToServer(false);
// });


// // Callback fired if Instance ID token is updated.
messaging.onTokenRefresh(function() {
  messaging.getToken()
  .then(function(refreshedToken) {
    console.log('Token refreshed.');
    // Indicate that the new Instance ID token has not yet been sent to the
    // app server.
    //setTokenSentToServer(false);
    // Send Instance ID token to app server.
    //sendTokenToServer(refreshedToken);
    console.log('refreshedToken');

    var userId = firebase.auth().currentUser.uid;
    firebase.database().ref('fcmTokens'+'/'+userId).set({
    	tokens: refreshedToken
    });
    // ...
  })
  .catch(function(err) {
    console.log('Unable to retrieve refreshed token ', err);
  });
});

//  messaging.onMessage(function(payload) {
//   console.log("Message received. ", payload);
//   // [START_EXCLUDE]
//   // Update the UI to include the received message.
//   appendMessage(payload);
//   // [END_EXCLUDE]
// });

//  
};