angular
    .module('teamform')
    .controller("DashboardCtrl", ['$scope', 'Events', 'Auth', 'Teams', '$stateParams', '$timeout', '$state', DashboardCtrl]);

function DashboardCtrl($scope, Events, Auth, Teams, $stateParams, $timeout, $state) {

    var uid = Auth.$getAuth().uid;
    $scope.events = Events.arr();

    $scope.tickInterval = 1000 //ms

    var tick = function() {
        $scope.dateTime = Date.now() // get the current time
        $timeout(tick, $scope.tickInterval); // reset the timer
    }

    // Start the timer
    $timeout(tick, $scope.tickInterval);
}
