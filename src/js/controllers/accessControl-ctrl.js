angular
    .module('teamform')
    .controller('AccessControlCtrl', ['$scope', '$firebaseArray', 'AccessControl', '$stateParams', '$state', 'Events', 'Auth', 'User', 'Notification',

        function($scope, $firebaseArray, AccessControl, $stateParams, $state, Events, Auth, User, Notification) {
            var $eventID;
            if (AccessControl.$val.eventID && $stateParams.eventID) {
              $eventID = $stateParams.eventID;
            } else {
              $state.go('index');
              return ;
            }

            var eventObj = Events.childObj($eventID);
            $scope.event = eventObj;
            var accessObj = AccessControl.obj();
            $scope.access = accessObj;

            $scope.isEventAdmin = false;
            $scope.listAsked = {};
            eventObj.$loaded().then(function () {
                if (eventObj.adminId == uid) {
                  $scope.isEventAdmin = true;
                  $scope.listAsked = $firebaseArray(AccessControl.listAsked());
                }
            });

            var requested = false;
            $scope.requestAccess = function() {
              if (!requested) requested=true;
              AccessControl.set($eventID, uid, 'asked');
            };

            $scope.acceptRequest = function($uid) {
              AccessControl.set($eventID, $uid, 'accepted');
              User.setTeamInfo($uid, $eventID, null, 'member');
              Events.childObj($eventID).$loaded().then(function (data) {
                Notification.send($uid, 'You have gained access to event "'+data.title+'"');
              });

            };
            $scope.rejectRequest = function($uid) {
              AccessControl.set($eventID, $uid, 'rejected');
              Events.childObj($eventID).$loaded().then(function (data) {
                Notification.send($uid, 'You have been rejceted access to event "'+data.title+'"');
              });
            };
        }


    ]);
