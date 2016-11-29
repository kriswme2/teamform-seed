angular.module('teamform', ['ui.bootstrap', 'ui.router', 'ngCookies', 'firebase', 'ngTagsInput', 'ngFileUpload'])

.run(["$rootScope", "$state", "$location", "$cookies", "messaging", "Auth",
  function($rootScope, $state, $location, $cookies, messaging, Auth) {
		$rootScope.auth = Auth;

    //Redirect user to login if they aren't logged in.
    $rootScope.auth.$onAuthStateChanged(function(firebaseUser) {

      // Store the entry uri using cookies
      var initialLocation =  $location.path();

      /* Initially, angularFire will set the state to not authenticated, and then do the login,
       * and change the state to authenticated.
       */
      $rootScope.firebaseUser = Auth.$getAuth();
      if(Auth.$getAuth()) {
      	// redirect user back to the uri where user came from
        if($location.path() === '/login') {
          $state.go('index');
          return;
        }
        $location.path(initialLocation);

        messaging.getToken()
          .then(function(currentToken) {
            if (currentToken) {
              //sendTokenToServer(currentToken);
              //updateUIForPushEnabled(currentToken);

              console.log(currentToken);

              var userId = $rootScope.firebaseUser.uid;
              firebase.database().ref('fcmTokens'+'/'+userId).set({
                tokens: currentToken  
              });
              
            } else {
              // Show permission request.
              console.log('No Instance ID token available. Request permission to generate one.');
              // Show permission UI.
              // updateUIForPushPermissionRequired();
              // setTokenSentToServer(false);
            }
          })
          .catch(function(err) {
            console.log('An error occurred while retrieving token. ', err);
            // setTokenSentToServer(false);
          });

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

            var userId = $rootScope.firebaseUser.uid;
            firebase.database().ref('fcmTokens'+'/'+userId).set({
              tokens: refreshedToken
            });
            // ...
          })
          .catch(function(err) {
            console.log('Unable to retrieve refreshed token ', err);
          });
        });

      }else{
        $state.go('login'); // go to login
      }
    });
}]);
