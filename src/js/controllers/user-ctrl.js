/**
 * Alerts Controller
 */

angular
  .module('teamform')
  .controller('UserCtrl', ['$scope', '$cookieStore', 'Auth', UserCtrl]);

  function UserCtrl($scope, $cookieStore, Auth) {
    var firebaseUser = Auth.$getAuth();
    $scope.displayName = firebaseUser.displayName;
    $scope.email = firebaseUser.email;
    $scope.message = null;

    $scope.updateProfile = function() {
      firebaseUser.updateProfile({
        displayName: $scope.displayName
      }).then(function() {
        // Profile updated successfully!
      }, function(error) {
        // An error happened.
        $scope.errorMessage = error.message;
      });
    };

  }
