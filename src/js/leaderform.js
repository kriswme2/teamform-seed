var app = angular.module("Teams", ["firebase", 'ngTagsInput']);

app.controller("TeamsCtrl", function($scope, $firebaseObject, $firebaseArray) {

    var refPath = '';
    eventName = '-KWSQVV0KsVAY_bgeyo3'

    $scope.selector = {
        options: [],
    }

    $scope.input = {
        teamName: '',
        teamSize: null,
        tags: [],
        member: []
    };

    initializeFirebase();

    refPath = 'Events/' + eventName;
    retrieveOnceFirebase(firebase, refPath, function(data) {
        if (data.val() != null) {
            $scope.getEvent = data.val();
            $scope.input.teamSize = $scope.getEvent.minMem;
            for (var i = $scope.getEvent.minMem; i <= $scope.getEvent.maxMem; i++)
                $scope.selector.options.push(i);
        }
        $scope.$apply();
    });

    $scope.addTeam = function() {

        var newInput = {
            'teamSize': $scope.input.teamSize,
            'regData': new Date().getTime(),
            'tags': $scope.input.tags,
            'member': $scope.input.member
        };

        var teamPath = 'Events/' + eventName + '/Teams/' + $scope.input.teamName;
        var ref = firebase.database().ref(teamPath);
        ref.set(newInput, function() { });
    }

});
