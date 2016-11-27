angular
    .module('teamform')
    .controller("TeamCtrl", ['$scope', 'Events', 'Teams', 'Auth', '$stateParams', '$state', 'Tags', 'User', TeamCtrl]);

function TeamCtrl($scope, Events, Teams, Auth, $stateParams, $state, Tags, User) {

    var uid = Auth.$getAuth().uid;

    $scope.eventID = $stateParams.eventID;
    $scope.teamID = $stateParams.teamID;
    $scope.teamInfo = null;
    $scope.teamObj = null;
    $scope.isTeamLeader = false;
    $scope.noTeam = false;

    if (($state.is("new_team") || $state.is("edit_team")) && $stateParams.eventID)
        setRange($stateParams.eventID);
    if ($state.is("edit_team") && $stateParams.teamID)
        loadTeam($stateParams.eventID, $stateParams.teamID);

    User.ref.child(uid).child('teams').orderByChild('eventID').equalTo($scope.eventID).once('value', function (snapshot) {
      if (!snapshot.val()) {
        $scope.noTeam = true;
      }
      snapshot.forEach(function (data) {
        if (!data.val().teamID) {
          $scope.noTeam = true;
        }
        console.log(data);
        $scope.teamInfo = {};
        $scope.teamInfo = data.val();
        $scope.teamInfo.$id = data.key;
      });
    });

    $scope.teams = Teams.arr($scope.eventID);

    $scope.selector = {
        options: [],
    };

    $scope.input = {
        teamName: '',
        teamSize: null,
        // tags: [],
        member: [],
        mode: "add",
    };
    $scope.input.member.push(uid);
    $scope.tags = [];

    $scope.$watchCollection("teamID", function () {
        if (!$scope.teamID) return;
        $scope.teamObj = $firebaseObject($scope.teams.child($scope.teamID));
        $scope.teamObj.$loaded().then(function () {
            if ($scope.teamObj.leaderId == uid) $scope.isTeamLeader = true;
        });
    });

    function addTeam() {
        var newInput = {
            'leaderId': uid,
            'teamSize': $scope.input.teamSize,
            'regData': new Date().getTime(),
            // 'tags': $scope.input.tags,
            'member': $scope.input.member
        };
        Teams.set($scope.eventID, $scope.input.teamName, newInput);
        Tags.tAdd($scope.eventID, $scope.input.teamName, $scope.tags);
        User.setTeamInfo(uid, $scope.eventID, $scope.input.teamName, 'leader', $scope.teamInfo);
        $state.go('event', { "eventID": $scope.eventID });
    }

    $scope.teamFormAction = function () {
        if ($scope.input.mode == "edit") {
            var updateRecord = {
                teamName: $scope.input.teamName,
                teamSize: $scope.input.teamSize,
            };
            if ($scope.tags) {
                Tags.tAdd($scope.eventID, $scope.teamID, $scope.tags);
            }
            $scope.team.update(updateRecord);
            $state.go('event', { "eventID": $scope.eventID });
        } else {
            addTeam();
        }
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
        Tags.tref.child(eId).child(tName).once("value").then(function (data) {
            if (data.val() !== null)
                $scope.tags = data.val().tags;
            $scope.$apply();
        });

    }

    $scope.join = function ($team) {console.log($team);
      if ($team.member.length < $team.teamSize) {
        $scope.noTeam = false;
        User.setTeamInfo(uid, $scope.eventID, $team.$id, 'member', $scope.teamInfo);
        Teams.childRef($scope.eventID, $team.$id).child('member').child($team.member.length).set(uid);
      }
    };
}
