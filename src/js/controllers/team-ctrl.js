angular
    .module('teamform')
    .controller("TeamCtrl", ['$scope', '$firebase', 'Auth', 'ngTagsInput', 'Event', TeamCtrl]);

function TeamCtrl($scope, $firebaseObject, $firebaseArray, Event) {

    var eventId = Event.getEventId();

    $scope.selector = {
        options: [],
    };

    $scope.input = {
        teamName: '',
        teamSize: null,
        tags: [],
        member: []
    };

    var userId = Auth.$getAuth().uid;
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

    $scope.addTeam = function (eventId) {

        $scope.input.member.push(userId);

        var newInput = {
            'leader': userId,
            'teamName': $scope.input.name,
            'teamSize': $scope.input.teamSize,
            'regData': new Date().getTime(),
            'tags': $scope.input.tags,
            'member': $scope.input.member
        };

        var newPath = refPath + '/Teams/' + eventId;
        var ref = firebase.database().ref(newPath);
        ref.push(newInput);
    };
}