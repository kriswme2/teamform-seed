var app = angular.module("teamform", ["firebase", 'ngTagsInput']);

app.controller("TeamsCtrl", function($scope, $firebaseObject, $firebaseArray) {

    initializeFirebase();
    var userId = 'FKQDZ9RMsTU53xWbXjBsHFdGcZz1';
    var eventId = '-KWbiYkhG15C2-k5TaqI';
    var tName = 'TeamA';

    $scope.selector = {
        options: []
    }

    $scope.input = {
        teamName: '',
        teamSize: null,
        tags: [],
        member: []
    };
    $scope.input.member.push(userId);

    var refPath = 'events/' + eventId;
    function setRange(Path) {
        firebase.database().ref(Path).once("value").then(function(data) {
            if (data.val() !== null) {
                $scope.getEvent = data.val();
                $scope.input.teamSize = $scope.getEvent.minMem;
                $scope.selector.options = [];
                for (var i = $scope.getEvent.minMem; i <= $scope.getEvent.maxMem; i++)
                    $scope.selector.options.push(i);
            }
            $scope.$apply();
        });
    }
    setRange(refPath);

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

    $scope.loadTeam = function() {
        var teamPath = 'teams/' + eventId + '/' + tName;
        firebase.database().ref(teamPath).once('value').then(function(data) {
            if (data.val() !== null) {
                var teamData = data.val();
                $scope.input = {
                    teamName: tName,
                    teamSize: teamData.teamSize,
                    tags: teamData.tags
                }
            }
            $scope.$apply();
        });
    };
});
