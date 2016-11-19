angular
    .module('teamform')
    .controller("TeamCtrl", ['$scope', 'Events', 'Teams', 'Auth', '$stateParams', TeamCtrl]);

function TeamCtrl($scope, Events, Teams, Auth, $stateParams) {

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

    $scope.addTeam = function () {
        var newInput = {
            'leaderId': uId,
            'teamSize': $scope.input.teamSize,
            'regData': new Date().getTime(),
            'tags': $scope.input.tags,
            'member': $scope.input.member
        };
        Teams.set($scope.eId, $scope.input.name, newInput);
    };

    function setRange(eId) {
        $scope.eId = eId;
        Events.childRef(eId).once("value").then(function (data) {
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

    function loadTeam(eId, tName) {
        Teams.childRef(eId, tName).once('value').then(function (data) {
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