angular
  .module('teamform')
  .controller("ChatroomCtrl",["$scope", "$timeout", "Chatroom",

  function($scope,$timeout,Chatroom) {
    Chatroom.chroom("a");
    Chatroom.send("haha");
    $scope.posts = Chatroom.list();
  }
]);
