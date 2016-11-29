angular
    .module('teamform')
    .controller('SkillsMatchCtrl', ['$scope', '$firebaseArray', 'User', 'Events', 'Teams', 'Auth', '$stateParams', '$state', 'Tags', '$filter', 'Notification', SkillsMatchCtrl]);

function SkillsMatchCtrl($scope, $firebaseArray, User, Events, Teams, Auth, $stateParams, $state, Tags, $filter, Notification) {

    var uid = Auth.$getAuth().uid;

    // var ref = $firebaseArray(Tags.uref);

    $scope.uSearch = [];
    $scope.eSearch = [];
    $scope.tSearch = [];

    $scope.uResult = [];
    $scope.eResult = [];
    $scope.tResult = [];

    $scope.uTags = $firebaseArray(Tags.uref);
    $scope.eTags = $firebaseArray(Tags.eref);
    $scope.tTags = $firebaseArray(Tags.tref);

    $scope.arr = [];

    $scope.SearchUser = function() {
        if ($scope.uSearch !== []) {
            $scope.uResult = [];
            $scope.uTags.$loaded().then(function(users) {
                angular.forEach(users, function(user) {
                    if (user.tags !== null) {
                        var uId = user.$id;

                        var sCount = Object.keys($scope.uSearch).length;
                        var uCount = Object.keys(user.tags).length;
                        if (sCount <= uCount) {
                            var found = 0;

                            $scope.uSearch.some(function(sTag) {
                                user.tags.some(function(uTag) {
                                    if ($filter('lowercase')(sTag.text) === $filter('lowercase')(uTag.text))
                                        found++;
                                });
                            });

                            if (found) {
                                firebase.database().ref('users').child(uId).once("value").then(function(data) {
                                    if (data.val() !== null) {
                                        var Match = {
                                            email: data.val().email,
                                            name: data.val().name,
                                            tags: user.tags
                                        };
                                        $scope.uResult.push(Match);
                                    }
                                    $scope.$apply();
                                });
                            }
                        }
                    }
                });
            });
        }
    };

    $scope.SearchEvent = function() {
        if ($scope.eSearch !== []) {
            $scope.eResult = [];
            $scope.eTags.$loaded().then(function(eData) {
                angular.forEach(eData, function(event) {
                    if (event.tags !== null) {
                        var eId = event.$id;

                        var sCount = Object.keys($scope.eSearch).length;
                        var eCount = Object.keys(event.tags).length;
                        if (sCount <= eCount) {
                            var found = 0;

                            $scope.eSearch.some(function(sTag) {
                                event.tags.some(function(eTag) {
                                    if ($filter('lowercase')(sTag.text) === $filter('lowercase')(eTag.text))
                                        found++;
                                });
                            });

                            if (found) {
                                Events.childRef(eId).once("value").then(function(data) {
                                    if (data.val() !== null) {
                                        var Match = {
                                            title: data.val().title,
                                            organizer: data.val().organizer,
                                            deadline: data.val().deadline,
                                            tags: event.tags
                                        };
                                        $scope.eResult.push(Match);
                                    }
                                    $scope.$apply();
                                });
                            }
                        }
                    }
                });
            });
        }
    };

    $scope.SearchTeam = function() {
      var isLeader = false;
        if ($scope.tSearch !== []) {
            $scope.tResult = [];
            $scope.tTags.$loaded().then(function(tData) {
                angular.forEach(tData, function(eData) {
                    var eId = eData.$id;
                    angular.forEach(eData, function(team, key) {
                        if (team.tags !== null)
                            var tId = key;

                        var sCount = Object.keys($scope.tSearch).length;
                        var tCount = Object.keys(team.tags).length;

                        if (sCount <= tCount) {
                            var found = 0;

                            $scope.tSearch.some(function(sTag) {
                                team.tags.some(function(tTag) {
                                    if ($filter('lowercase')(sTag.text) === $filter('lowercase')(tTag.text))
                                        found++;
                                });
                            });

                            if (found) {
                                console.log('true');

                                Teams.childRef(eId, tId).once("value").then(function(data) {
                                    if (data.val() !== null) {
                                        console.log(data.val().leaderId);
                                        User.childObj(data.val().leaderId).$loaded().then(function(uData) {
                                          if(data.val().leaderId === uid){
                                            isLeader = true;
                                          }
                                            var Match = {
                                                name: tId,
                                                leader: uData.name,
                                                teamSize: data.val().teamSize,
                                                numOfMem: data.val().member.length,
                                                tags: team.tags,
                                                isLeader: isLeader,
                                                eId: eId,
                                                tId: tId
                                            };
                                            $scope.tResult.push(Match);
                                        });
                                    }
                                    $scope.$apply();
                                });
                            }
                        }
                    });
                });
            });
        }
    }

    $scope.join = function(t) {
      if (t.numOfMem < t.teamSize) {
        User.setTeamInfo(uid, t.eId, t.tId, 'member');
        Teams.childRef(t.eId, t.tId).child('member').child(t.numOfMem).set(uid);
        Teams.childObj(t.eId, t.tId).$loaded().then(function (data) {
          Notification.send(data.leaderId, 'A new member has joined the team "'+data.$id+'"');
        });
      }
    }
}
