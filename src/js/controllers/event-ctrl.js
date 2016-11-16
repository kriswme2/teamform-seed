angular
    .module('teamform')
    .controller("EventsCtrl", ['$scope', '$firebaseArray', 'Auth', EventsCtrl]);

function EventsCtrl($scope, $firebaseArray, Auth) {

    var uId = Auth.$getAuth().uid;
    var ref = firebase.database().ref('events');
    $scope.events = $firebaseArray(ref);

    $scope.input = {
        organizer: "",
        semester: "Not Applicable",
        course: "",
        title: "",
        numOfTeam: "",
        maxMem: 4,
        minMem: 1,
        privacy: "public",
        desc: "",
        tags: []
    };

    var eId = null;
    $scope.addEvent = function () {
        if ($scope.input.organizer !== "" && $scope.input.title !== "") {
            $scope.input.adminId = uId;
            $scope.input.deadline = $scope.dt.getTime();
            $scope.input.createDate = new Date().getTime();
            eId = ref.push($scope.input).key;
        }
    };

    $scope.loadEvent = function (eId) {
        var ePath = 'events/' + eId;
        firebase.database().ref(ePath).once("value").then(function (data) {
            if (data.val() !== null) {
                var eData = data.val();
                $scope.input = {
                    organizer: eData.organizer,
                    semester: eData.semester,
                    course: eData.course,
                    title: eData.title,
                    numOfTeam: eData.numOfTeam,
                    maxMem: eData.maxMem,
                    minMem: eData.minMem,
                    privacy: eData.privacy,
                    desc: eData.desc,
                    tags: eData.tags
                };
                $scope.dt = new Date(eData.deadline);
            }
            $scope.$apply();
        });
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
