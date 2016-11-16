angular
    .module('teamform')
    .controller("TeamCtrl", ['$scope', 'Auth', '$stateParams', TeamCtrl]);

function TeamCtrl($scope, Auth, $stateParams) {

    var uId = Auth.$getAuth().uid;
    if ($stateParams.eventID)
        setRange($stateParams.eventID);
    if ($stateParams.teamID)
        loadTeam($stateParams.eventID, $stateParams.teamID);

    $scope.selector = {
        options: [],
    };

    $scope.input = {
        teamName: '',
        teamSize: null,
        tags: [],
        member: []
    };
    $scope.input.member.push(uId);

    function setRange(eId) {
        $scope.eId = eId;
        var ePath = 'events/' + eId;
        firebase.database().ref(ePath).once("value").then(function (data) {
            if (data.val() !== null) {
                var eData = data.val();
                $scope.input.teamSize = eData.minMem;
                $scope.selector.options = [];
                for (var i = eData.minMem; i <= eData.maxMem; i++)
                    $scope.selector.options.push(i);
            }
            $scope.$apply();
        });
    }

    $scope.addTeam = function () {
        var newInput = {
            'leaderId': uId,
            'teamSize': $scope.input.teamSize,
            'regData': new Date().getTime(),
            'tags': $scope.input.tags,
            'member': $scope.input.member
        };
        var newPath = 'teams/' + $scope.eId + '/' + $scope.input.teamName;
        var ref = firebase.database().ref(newPath);
        ref.set(newInput);
    };

    function loadTeam(eId, tName) {
        var tPath = 'teams/' + eId + '/' + tName;
        firebase.database().ref(tPath).once('value').then(function (data) {
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
    }
}