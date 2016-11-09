angular
  .module('teamform')
  .controller("NotificationCtrl",["$scope", "$timeout", "Notification",

  function($scope,$timeout,Notification) {
    $scope.noww = null;
    $scope.list = function() {
      $scope.noww = new Date();
      $timeout(function(){
        $scope.list();
      },500);
    };
    $scope.list();
  }
]);
