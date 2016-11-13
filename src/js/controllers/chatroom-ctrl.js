angular
  .module('teamform')
  .controller("ChatroomCtrl",["$scope", "$timeout", "$firebaseArray", "Chatroom",

  function($scope,$timeout,$firebaseArray,Chatroom) {
    var currentRoomRef = Chatroom.chroom("a");
    $scope.posts = $firebaseArray(currentRoomRef);

    $scope.sendMessage = function(){
            
            Chatroom.send($scope.message);
            $scope.message = "";

    }

  }
]);
