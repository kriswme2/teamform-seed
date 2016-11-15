angular
    .module('teamform')
    .controller("EventCtrl", ['$scope', 'firebase', 'Auth', 'ui.bootstrap', 'ngTagsInput', EventCtrl]);

function EventCtrl($scope) {

    $scope.input = {
        admin: null,
        organizer: "",
        semester: "Not Applicable",
        course: "",
        title: "",
        deadline: "",
        numOfTeam: "",
        maxMem: 4,
        minMem: 1,
        privacy: "public",
        desc: "",
        createDate: null,
        tags: []
    };

    var userId = Auth.$getAuth().uid;
    var ref = firebase.database().ref('events');

    $scope.addEvent = function () {
        $scope.input.admin = userId;
        $scope.input.deadline = $scope.dt.getTime();
        $scope.input.createDate = new Date().getTime();
        ref.push($scope.input);
    };

    $scope.editMaxMem = function (i) {
        $scope.input.maxMem += i;
        if ($scope.input.maxMem < 1)
            $scope.input.maxMem = 1;
        if ($scope.input.maxMem < $scope.input.minMem)
            $scope.input.minMem = $scope.input.maxMem;
    };

    $scope.editMinMem = function (i) {
        $scope.input.minMem += i;
        if ($scope.input.minMem > $scope.input.maxMem)
            $scope.input.maxMem = $scope.input.minMem;
        if ($scope.input.minMem < 1)
            $scope.input.minMem = 1;
    };

    $scope.today = function () {
        $scope.dt = new Date();
    };
    $scope.today();

    $scope.clear = function () {
        $scope.dt = null;
    };

    $scope.dateOptions = {
        formatYear: 'yy',
        maxDate: new Date(2020, 5, 22),
        minDate: new Date(),
        startingDay: 1
    };

    $scope.open = function () {
        $scope.popup.opened = true;
    };

    $scope.setDate = function (year, month, day) {
        $scope.dt = new Date(year, month, day);
    };

    $scope.popup = {
        opened: false
    };
}