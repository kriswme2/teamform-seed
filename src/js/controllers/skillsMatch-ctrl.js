angular
    .module('teamform')
    .controller('SkillsMatchCtrl', ['$scope', 'Events', 'Teams', 'Auth', '$stateParams', '$state', 'Tags', SkillsMatchCtrl]);

function SkillsMatchCtrl($scope, Events, Teams, Auth, $stateParams, $state, Tags) {

    var uid = Auth.$getAuth().uid;

    $scope.userTags = $firebaseArray(Tags.uref);
    $scope.eventTags = $firebaseArray(Tags.eref);
    $scope.teamTags = $firebaseArray(Tags.tref);

    $scope.users = $firebaseArray(firebase.database().ref('users'));
    $scope.events = Events.arr();
    $scope.selectEventID = null;
    $scope.teams = null;

    $scope.uSearch = [];
    $scope.eSearch = [];
    $scope.tSearch = [];

    $scope.SearchUser = function () {
        if ($scope.uSearch !== []) {
            $scope.uSearch.forEach($scope.uSearch, function(target){
            $scope.userTags.$loaded()
                .then(function (user) {
                    angular.forEach(user, function(tag, key){
                        $scope.uSearch.push(tag);
                    });
                });
            });
        }
    };

    $scope.SearchEvent = function () {

    };

    $scope.SearchTeam = function () {

    };

    $scope.uResult = [];
    $scope.eResult = [];
    $scope.tResult = [];


}