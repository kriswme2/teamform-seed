/**
 * Alerts Controller
 */

angular
  .module('teamform')
  .controller('UserCtrl', ['$scope', 'Auth', UserCtrl]);

function UserCtrl($scope, Auth) {
  var firebaseUser = Auth.$getAuth();
  $scope.displayName = firebaseUser.displayName;
  $scope.email = firebaseUser.email;
  $scope.message = null;
  $scope.newPassword = null;

  $scope.updateProfile = function () {
    firebaseUser.updateProfile({
      displayName: $scope.displayName
    }).then(function () {
      // Profile updated successfully!
    }, function (error) {
      // An error happened.
      $scope.errorMessage = error.message;
    });
  };

  $scope.changePassword = function() {
    $scope.message = '';
    $scope.errorMessage = '';
    if($scope.newPassword !== $scope.confirmPassword) {
      $scope.errorMessage = "Confirm Password is different from new password";
      return;
    }

    Auth.$updatePassword($scope.newPassword).then(function() {
      $scope.message = "Password successfully changed!";
    }).catch(function(error) {
      $scope.errorMessage = error.message;
    });
  };

}
