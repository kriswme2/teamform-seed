angular
  .module('teamform')
  .controller("NotificationCtrl",["$scope", "$timeout", "Notification",

  function($scope,$timeout,Notification) {
    $scope.notifications = Notification.list("bb");

    //Notification.send("aa", "bb", "4434");
    $scope.listLength = function() {
      return Notification.list().length;
    };
  }
]);
