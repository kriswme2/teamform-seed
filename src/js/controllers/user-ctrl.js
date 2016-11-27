/**
 * Alerts Controller
 */

angular
  .module('teamform')
  .controller('UserCtrl', ['$scope', 'Auth', 'User', 'Tags', UserCtrl]);

function UserCtrl($scope, Auth, User, Tags) {
  var firebaseUser = Auth.$getAuth();
  $scope.displayName = firebaseUser.displayName;
  $scope.email = firebaseUser.email;
  $scope.uid = Auth.$getAuth().uid;
  $scope.message = null;
  $scope.newPassword = null;
  $scope.skillTags = [];
  
  function loadTag(uId) {
    Tags.uref.child(uId).once("value").then(function (data) {
      if (data.val() !== null)
        $scope.skillTags = data.val().tags;
    });
  }
  loadTag($scope.uid );

  $scope.addTags = function () {
    Tags.uAdd($scope.uid, $scope.skillTags);
  };

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

  $scope.changePassword = function () {
    $scope.message = '';
    $scope.errorMessage = '';
    $scope.messageLocation = 'password';
    if ($scope.newPassword !== $scope.confirmPassword) {
      $scope.errorMessage = "Confirm Password is different from new password";
      return;
    }

    Auth.$updatePassword($scope.newPassword).then(function () {
      $scope.message = "Password successfully changed!";
    }).catch(function (error) {
      $scope.errorMessage = error.message;
    });
  };

  $scope.updatePicture = function () {
    $scope.message = '';
    $scope.errorMessage = '';
    $scope.messageLocation = "profile_pic";

    if($scope.pictureField === undefined) {
      $scope.errorMessage = "Please select a file before submit!";
      return;
    }

    User.updatePicture($scope.pictureField).then(function() {
      $scope.message = 'Profile picture successfully changed!';
    })
    .catch(function(error) {
      $scope.errorMessage = error.errorMessage;
    });
  };

}
