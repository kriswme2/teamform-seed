var app = angular.module("teamform", ["firebase", 'ngTagsInput']);

app.controller("TeamsCtrl", function ($scope, $firebaseObject, $firebaseArray) {

    initializeFirebase();
    var userId = 'FKQDZ9RMsTU53xWbXjBsHFdGcZz1';
    var eventId = '-KWbiYkhG15C2-k5TaqI';

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
    retrieveOnceFirebase(firebase, refPath, function (data) {
        if (data.val() !== null) {
            $scope.getEvent = data.val();
            $scope.input.teamSize = $scope.getEvent.minMem;
            for (var i = $scope.getEvent.minMem; i <= $scope.getEvent.maxMem; i++)
                $scope.selector.options.push(i);
        }
        $scope.$apply();
    });

    $scope.addTeam = function () {
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
});
