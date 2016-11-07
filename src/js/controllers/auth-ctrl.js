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
      $scope.errorCode = null;
      $scope.errorMessage = null;

      $firebaseAuth().$signInWithEmailAndPassword($scope.email, $scope.password).then(function(firebaseUser) {
        //success
        $scope.firebaseUser = firebaseUser;
      }).catch(function(error) {
        // Handle Errors here.
        $scope.errorCode = error.code;
        $scope.errorMessage = error.message;
      });

    };

    $scope.signInWithPopup = function(provider) {
      $scope.firebaseUser = null;
      $scope.errorCode = null;
      $scope.errorMessage = null;

      if(provider === "facebook") {
        provider = new firebase.auth.FacebookAuthProvider();
      }else if (provider === "google") {
        provider = new firebase.auth.GoogleAuthProvider();
      }else if (provider === "github") {
        provider = new firebase.auth.GithubAuthProvider();
      }

      $firebaseAuth().$signInWithPopup( provider ).then(function(firebaseUser) {
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
      $scope.errorCode = null;
      $scope.errorMessage = null;

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
    //   $scope.errorMessage = null;

    //   // Delete the currently signed-in user
    //   Auth.$deleteUser().then(function() {
    //     $scope.message = "User deleted";
    //   }).catch(function(error) {
    //     $scope.error = error;
    //   });
    // };

  }
]);