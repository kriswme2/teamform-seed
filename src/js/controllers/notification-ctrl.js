angular
  .module('teamform')
  .controller("NotificationCtrl",["$scope", "$timeout", "Notification",

  function($scope,$timeout,Notification) {
    $scope.notifications = Notification.list("bb");

    //Notification.send("aa", "bb", "4434");


    $scope.list = function() {
      $scope.noww = Notification.list().length;
      // $timeout(function(){
      //   $scope.list();
      // },500);
    };
    //$scope.list();
  }
]);
