angular
    .module('teamform')
    .controller("TeamCtrl", ['$scope', 'Events', 'Teams', 'Auth', '$stateParams', '$state', 'Tags', TeamCtrl]);

function TeamCtrl($scope, Events, Teams, Auth, $stateParams, $state, Tags) {

    var uid = Auth.$getAuth().uid;
    if (($state.is("new_team") || $state.is("edit_team")) && $stateParams.eventID)
        setRange($stateParams.eventID);
    if ($state.is("edit_team") && $stateParams.teamID)
        loadTeam($stateParams.eventID, $stateParams.teamID);


    $scope.eventID = $stateParams.eventID;
    $scope.teams = Teams.arr($scope.eventID);

    $scope.selector = {
        options: [],
    };

    $scope.input = {
        teamName: '',
        teamSize: null,
        // tags: [],
        member: []
    };
    $scope.input.member.push(uid);
    $scope.tags = [];

    $scope.addTeam = function() {
        var newInput = {
            'leaderId': uid,
            'teamSize': $scope.input.teamSize,
            'regData': new Date().getTime(),
            // 'tags': $scope.input.tags,
            'member': $scope.input.member
        };
        Teams.set($scope.eId, $scope.input.teamName, newInput);
        Tags.tAdd($scope.eId, $scope.input.teamName, $scope.tags);
    };

    function setRange(eId) {
        $scope.eId = eId;
        Events.childRef(eId).once("value").then(function(data) {
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
        Teams.childRef(eId, tName).once('value').then(function(data) {
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
        Tags.tref.child(eId).child(tName).once('value').then(function(data) {
            if(data.val() !== null){
                $scope.tags = data.val().tags;
            }
            $scope.$apply();
        });

    }
}