angular
    .module('teamform')
    .controller('debugNotiCtrl', ['$scope', 'Auth', 'User', 'Notification',

        function($scope, Auth, User, Notification) {


            var uid = Auth.$getAuth().uid;
            $scope.send = function() {
              Notification.send(uid, 'Testing Notification from uid "'+uid+'"');
            };
        }


    ]);
