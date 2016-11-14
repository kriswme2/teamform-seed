angular
    .module('teamform')
    .controller("ChatroomCtrl", ["$scope", "$timeout", "$firebaseArray", "Chatroom",

        function($scope, $timeout, $firebaseArray, Chatroom) {
            var currentRoomRef = Chatroom.chroom("a");
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
