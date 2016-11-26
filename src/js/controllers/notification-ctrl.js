angular
  .module('teamform')
  .controller("NotificationCtrl",["$scope", "$timeout", "Notification", "$firebaseObject",

  function($scope,$timeout,Notification,$firebaseObject) {
    obj = $firebaseObject(Notification.list());
    $scope.notifications = obj;
    obj.$bindTo($scope, "notifications");

    $scope.toggled = function(state) {
      if (state) {
        Notification.opened();
      }
    }

    // Notification.send(ReceiverUid, "33333");
  }
]);
