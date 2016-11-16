angular
    .module('teamform')
<<<<<<< HEAD
    .controller("TeamCtrl", ['$scope', '$sce', 'Events', 'Teams', 'Auth', '$stateParams', '$state', TeamCtrl]);

function TeamCtrl($scope, $sce, Events, Teams, Auth, $stateParams, $state) {

    var uid = Auth.$getAuth().uid;
    if (($state.is("new_team") || $state.is("edit_team")) && $stateParams.eventID)
        setRange($stateParams.eventID);
    if ($state.is("edit_team") && $stateParams.teamID)
        loadTeam($stateParams.eventID, $stateParams.teamID);
    
    $scope.eventID = $stateParams.eventID;
    $scope.teams = Teams.arr($scope.eventID);
=======
    .controller("TeamCtrl", ['$scope', 'Auth', 'Event', '$stateParams', TeamCtrl]);

function TeamCtrl($scope, Auth, Event, $stateParams) {

    var userId = Auth.$getAuth().uid;
    var eventId = $stateParams.eventID;
>>>>>>> save

    $scope.selector = {
        options: [],
    };

    $scope.input = {
        teamName: '',
        teamSize: null,
        tags: [],
        member: []
    };
    $scope.input.member.push(uid);

    $scope.addTeam = function () {
        var newInput = {
            'leaderId': uid,
            'teamSize': $scope.input.teamSize,
            'regData': new Date().getTime(),
            'tags': $scope.input.tags,
            'member': $scope.input.member
        };
        Teams.set($scope.eId, $scope.input.teamName, newInput);
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