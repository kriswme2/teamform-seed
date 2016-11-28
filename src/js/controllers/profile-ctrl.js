/**
 * Alerts Controller
 */

angular
  .module('teamform')
  .controller('ProfileCtrl', ['$scope', 'Auth', 'User', 'Tags', '$stateParams', ProfileCtrl]);

function ProfileCtrl($scope, Auth, User, Tags, $stateParams) {
  var firebaseUser = Auth.$getAuth();
  $scope.profile = {};
  $scope.profile.name = null;
  $scope.profile.email = null;
  $scope.uid = $stateParams.uid;
  $scope.skillTags = [];
  $scope.teamInfo = User.teamArr($scope.uid);

  $scope.profile = User.childObj($scope.uid);

  function loadTag(uId) {
    Tags.uref.child(uId).once("value").then(function (data) {
      if (data.val() !== null)
        $scope.skillTags = data.val().tags;
    });
  }
  loadTag($scope.uid );


}
