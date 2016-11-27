angular
    .module('teamform')
    .controller('AccessControlCtrl', ['$scope', '$firebaseArray', 'AccessControl', '$stateParams', '$state', 'Events', 'Auth',

        function($scope, $firebaseArray, AccessControl, $stateParams, $state, Events, Auth) {
            var $eventID;
            if (AccessControl.$val.eventID && $stateParams.eventID) {
              $eventID = $stateParams.eventID;
            } else {
              $state.go('index');
              return ;
            }

            var uid = Auth.$getAuth().uid;
            var eventObj = Events.childObj($eventID);
            $scope.event = eventObj;
            var accessObj = AccessControl.obj();
            $scope.access = accessObj;

            var requested = false;
            $scope.requestAccess = function() {
              if (!requested) requested=true;
              AccessControl.set($eventID, uid, 'asked');
            };
        }


    ]);
