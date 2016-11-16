angular
    .module('teamform')
    .controller("TeamCtrl", ['$scope', 'Auth', 'Event', '$stateParams', TeamCtrl]);

function TeamCtrl($scope, Auth, Event, $stateParams) {

    var userId = Auth.$getAuth().uid;
    var eventId = $stateParams.eventID;

    $scope.selector = {
        options: [],
    };

    $scope.input = {
        teamName: '',
        teamSize: null,
        tags: [],
        member: []
    };
    $scope.input.member.push(userId);

    var refPath = 'events/' + eventId;
    firebase.database().ref(refPath).once("value").then(function(data) {
        if (data.val() !== null) {
            $scope.getEvent = data.val();
            $scope.input.teamSize = $scope.getEvent.minMem;
            for (var i = $scope.getEvent.minMem; i <= $scope.getEvent.maxMem; i++)
                $scope.selector.options.push(i);
        }
        $scope.$apply();
    });

    $scope.addTeam = function() {
        var newInput = {
            'leaderId': userId,
            'teamSize': $scope.input.teamSize,
            'regData': new Date().getTime(),
            'tags': $scope.input.tags,
            'member': $scope.input.member
        };
        var newPath = 'teams/' + eventId + '/' + $scope.input.teamName;
        var ref = firebase.database().ref(newPath);
        ref.set(newInput);
    };

    $scope.loadTeam = function(eId, tName) {
        var tPath = 'teams/' + eId + '/' + tName;
        firebase.database().ref(tPath).once('value').then(function(data) {
            if (data.val() !== null) {
                var tData = data.val();
                $scope.input = {
                    teamName: tName,
                    teamSize: tData.teamSize,
                    tags: tData.tags
                };
            }
            $scope.$apply();
        });
    };
}