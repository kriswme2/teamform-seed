angular
  .module('teamform')
  .controller("NotificationCtrl",["$scope", "$timeout", "Notification","User",

  function($scope,$timeout,Notification,User) {
    var tasks = User.getProfile("7jiVqUTaNGh8m1q0XKxX4EyacOm1");
    tasks.$bindTo($scope, "uuuu").then(function(tasks){
      console.log($scope.uuuu);
    });
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
