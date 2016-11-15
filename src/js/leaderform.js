var app = angular.module("teamform", ["firebase", 'ngTagsInput']);

app.controller("TeamsCtrl", function ($scope, $firebaseObject, $firebaseArray) {

    refPath = '';

    $scope.selector = {
        options: [],
    };

    $scope.input = {
        teamName: '',
        teamSize: null,
        tags: [],
        member: []
    };

    initializeFirebase();

    var adminId = 'FKQDZ9RMsTU53xWbXjBsHFdGcZz1';
    var eventId = '-KWYJg6RIb2lha1r0968';
    var refPath = '/users/' + adminId + '/events/' + eventId;
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

        $scope.input.member.push(userId);

        var newInput = {
            'leader': 'FKQDZ9RMsTU53xWbXjBsHFdGcZz1',
            'teamSize': $scope.input.teamSize,
            'regData': new Date().getTime(),
            'tags': $scope.input.tags,
            'member': $scope.input.member
        };

        var newPath = refPath + '/teams/' + $scope.input.teamName;
        var ref = firebase.database().ref(newPath);
        ref.set(newInput, function () { });
    };

});
