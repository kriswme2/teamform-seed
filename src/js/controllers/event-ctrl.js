angular
    .module('teamform')
    .controller("EventsCtrl", ['$scope', 'Auth', "$firebaseArray",EventsCtrl]);

function EventsCtrl($scope, Auth, $firebaseArray) {

    var userId = Auth.$getAuth().uid;

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

    var eventId = null;
    var ref = firebase.database().ref('events');

    $scope.addEvent = function() {
        $scope.input.adminId = userId;
        $scope.input.deadline = $scope.dt.getTime();
        $scope.input.createDate = new Date().getTime();
        eventId = ref.push($scope.input).key;
    };

<<<<<<< HEAD
    $scope.events = $firebaseArray(firebase.database().ref('events'));

    $scope.editMaxMem = function (i) {
=======
    $scope.loadEvent = function(eventId) {
        var refPath = 'events/' + eventId;
        firebase.database().ref(refPath).once("value").then(function(data) {
            if (data.val() !== null) {
                var eventData = data.val();
                $scope.input = {
                    organizer: eventData.organizer,
                    semester: eventData.semester,
                    course: eventData.course,
                    title: eventData.title,
                    numOfTeam: eventData.numOfTeam,
                    maxMem: eventData.maxMem,
                    minMem: eventData.minMem,
                    privacy: eventData.privacy,
                    desc: eventData.desc,
                    tags: eventData.tags
                };
                $scope.dt = new Date(eventData.deadline);
            }
            $scope.$apply();
        });
    }

    $scope.editMaxMem = function(i) {
>>>>>>> origin/adminform
        $scope.input.maxMem += i;
        if ($scope.input.maxMem < 1)
            $scope.input.maxMem = 1;
        if ($scope.input.maxMem < $scope.input.minMem)
            $scope.input.minMem = $scope.input.maxMem;
    };

    $scope.editMinMem = function(i) {
        $scope.input.minMem += i;
        if ($scope.input.minMem > $scope.input.maxMem)
            $scope.input.maxMem = $scope.input.minMem;
        if ($scope.input.minMem < 1)
            $scope.input.minMem = 1;
    };

    $scope.today = function() {
        $scope.dt = new Date();
    };
    $scope.today();

    $scope.clear = function() {
        $scope.dt = null;
    };

    $scope.dateOptions = {
        formatYear: 'yy',
        maxDate: new Date(2020, 5, 22),
        minDate: new Date(),
        startingDay: 1
    };

    $scope.open = function() {
        $scope.popup.opened = true;
    };

    $scope.setDate = function(year, month, day) {
        $scope.dt = new Date(year, month, day);
    };

    $scope.popup = {
        opened: false
    };
}
