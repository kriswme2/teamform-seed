angular
    .module('teamform')
    .controller("TeamCtrl", ['$scope', 'Auth', '$stateParams', TeamCtrl]);

function TeamCtrl($scope, Auth, $stateParams) {

    var $uId = Auth.$getAuth().uid;
    var $eId, $tId;

    $scope.selector = {
        options: [],
    };

    $scope.input = {
        teamName: '',
        teamSize: null,
        tags: [],
        member: []
    };
    $scope.input.member.push($uId);

    if ($stateParams.eventID) {
        $eId = $stateParams.eventID;
        $scope.loadRange();
        if ($stateParams.teamID) {
            $tId = $stateParams.teamID;
            $scope.loadTeam();
        } else {
            $tId = 'a';
        }
    } else {
        $eId = 'a';
    }

    $scope.addTeam = function () {
        if ($eId !== null) {
            var newInput = {
                'leaderId': $uId,
                'teamSize': $scope.input.teamSize,
                'regData': new Date().getTime(),
                'tags': $scope.input.tags,
                'member': $scope.input.member
            };
            var newPath = 'teams/' + $eId + '/' + $scope.input.teamName;
            var ref = firebase.database().ref(newPath);
            ref.set(newInput);
        }
    };

    $scope.loadRange = function () {
        var ePath = 'events/' + $eId;
        firebase.database().ref(ePath).once("value").then(function (data) {
            if (data.val() !== null) {
                $scope.eData = data.val();
                $scope.input.teamSize = $scope.eData.minMem;
                $scope.selector.options = [];
                for (var i = eData.minMem; i <= $scope.eData.maxMem; i++)
                    $scope.selector.options.push(i);
            }
            $scope.$apply();
        });
    };

    $scope.loadTeam = function () {
        var tPath = 'teams/' + $eId + '/' + $tId;
        firebase.database().ref(tPath).once('value').then(function (data) {
            if (data.val() !== null) {
                $scope.tData = data.val();
                $scope.input = {
                    teamName: $tId,
                    teamSize: $scope.tData.teamSize,
                    tags: $scope.tData.tags
                };
            }
            $scope.$apply();
        });
    };
}