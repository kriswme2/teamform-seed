/**
 * Authentication Controller
 */

angular
  .module('teamform')
  .controller("AuthCtrl", ["$scope", "$firebaseAuth", "$state", "Auth",

  function($scope, $firebaseAuth, $state, Auth) {
    $scope.auth = Auth;
    $scope.email = null;
    $scope.password = null;
    $scope.confirmPassword = null;
    $scope.errorMessage = null;

    $scope.signIn = function() {
      $scope.firebaseUser = null;
      $scope.error = null;

      $firebaseAuth().$signInWithEmailAndPassword($scope.email, $scope.password).then(function(firebaseUser) {
        //success
        $scope.firebaseUser = firebaseUser;
      }).catch(function(error) {
        // Handle Errors here.
        $scope.errorCode = error.code;
        $scope.errorMessage = error.message;
      });

    };

    $scope.signInWithFacebook = function() {
      $scope.firebaseUser = null;
      $scope.error = null;

      $firebaseAuth().$signInWithPopup( new firebase.auth.FacebookAuthProvider() ).then(function(firebaseUser) {
        //success
        $scope.firebaseUser = firebaseUser;
      }).catch(function(error) {
        // Handle Errors here.
        $scope.errorCode = error.code;
        $scope.errorMessage = error.message;
      });
    };

    $scope.signInWithGoogle = function() {
      $scope.firebaseUser = null;
      $scope.error = null;

      $firebaseAuth().$signInWithPopup( new firebase.auth.GoogleAuthProvider() ).then(function(firebaseUser) {
        //success
        $scope.firebaseUser = firebaseUser;
      }).catch(function(error) {
        // Handle Errors here.
        $scope.errorCode = error.code;
        $scope.errorMessage = error.message;
      });
    };
    
    $scope.signInWithGithub = function() {
      $firebaseAuth().$signInWithPopup( new firebase.auth.GithubAuthProvider() ).then(function(firebaseUser) {
        //success
        $scope.firebaseUser = firebaseUser;
      }).catch(function(error) {
        // Handle Errors here.
        $scope.errorCode = error.code;
        $scope.errorMessage = error.message;
      });
    };

    $scope.createUser = function() {
      $scope.message = null;
      $scope.error = null;

      if($scope.password !== $scope.confirmPassword) {
        $scope.errorMessage = "Confirm Password is different form password!";
        return;
      }

      // Create a new user
      Auth.$createUserWithEmailAndPassword($scope.email, $scope.password)
        .then(function(firebaseUser) {
          $scope.message = "User created!";
          firebaseUser.updateProfile({
            displayName: $scope.name
          });
        }).catch(function(error) {
          $scope.errorCode = error.code;
          $scope.errorMessage = error.message;
        });
    };

    // $scope.deleteUser = function() {
    //   $scope.message = null;
    //   $scope.error = null;

    //   // Delete the currently signed-in user
    //   Auth.$deleteUser().then(function() {
    //     $scope.message = "User deleted";
    //   }).catch(function(error) {
    //     $scope.error = error;
    //   });
    // };

  }
]);