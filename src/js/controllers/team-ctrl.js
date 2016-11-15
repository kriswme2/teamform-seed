angular
    .module('teamform')
    .controller("TeamCtrl", ['$scope', '$firebase', 'ngTagsInput', TeamCtrl]);

function TeamCtrl($scope, $firebaseObject, $firebaseArray, adminId, eventId) {

    $scope.selector = {
        options: [],
    };

    $scope.input = {
        teamName: '',
        teamSize: null,
        tags: [],
        member: []
    };

    var userId = firebase.auth().currentUser.uid;
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
            'leader': userId,
            'teamSize': $scope.input.teamSize,
            'regData': new Date().getTime(),
            'tags': $scope.input.tags,
            'member': $scope.input.member
        };

        var newPath = refPath + '/Teams/' + $scope.input.teamName;
        var ref = firebase.database().ref(newPath);
        ref.push(newInput);
    };
}