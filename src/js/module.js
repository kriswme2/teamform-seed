angular.module('teamform', ['ui.bootstrap', 'ui.router', 'ngCookies', 'firebase'])
.run(function($rootScope, $state, $location, $cookies, Auth) {
		$rootScope.auth = Auth;

		//Redirect user to index if the user is logged in.
    $rootScope.$on( '$stateChangeStart', function(e, toState, toParams, fromState, fromParams) {

      if(toState.name === "login" || toState.name === "register"){
        if(Auth.$getAuth()) {
          e.preventDefault();
          $state.go('index');
        }
      	return; // no need to redirect 
      }

    });

    //Redirect user to login if they aren't logged in.
    $rootScope.auth.$onAuthStateChanged(function(firebaseUser) {

      // Store the entry uri using cookies
      $cookies.put('initialLocation', $location.path());

      /* Initially, angularFire will set the state to not authenticated, and then do the login,
       * and change the state to authenticated.
       */
      $rootScope.firebaseUser = Auth.$getAuth();
      if(Auth.$getAuth()) {
      	// redirect user to the entry point specified by the user
        var redirectTo = $cookies.get('initialLocation'); // set in the beginning of this file
        if($location.path() === '/login') {
          $state.go('index');
        }
        $location.path(redirectTo);
      }else{
        $state.go('login'); // go to login
      }
    });
});