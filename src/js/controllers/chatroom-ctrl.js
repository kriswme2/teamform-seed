angular
    .module('teamform')
    .controller("ChatroomCtrl", ["$scope", "$timeout", "$firebaseArray", "Chatroom", "$stateParams",

        function($scope, $timeout, $firebaseArray, Chatroom, $stateParams) {
            var $eventID;
            if ($stateParams.eventID) {
              $eventID = $stateParams.eventID;
            } else {
              $eventID = "a";
            }
            var currentRoomRef = Chatroom.chroom($eventID);
            $scope.posts = $firebaseArray(currentRoomRef);

            $scope.setChatRoom = function() {

                    var currentRoomRef = Chatroom.chroom("b");
                    $scope.posts = $firebaseArray(currentRoomRef);

            }

            $scope.sendMessage = function() {

                Chatroom.send($scope.message);
                $scope.message = "";

            }

            //$timeout($scope.setChatRoom, 3000);

        }


    ]);
