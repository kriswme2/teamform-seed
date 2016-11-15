var app = angular.module("teamform", ["firebase", "ui.bootstrap", "ngTagsInput"]);

app.controller("EventsCtrl", function ($scope, $firebaseArray) {

    initializeFirebase();;
    var userId = 'FKQDZ9RMsTU53xWbXjBsHFdGcZz1';

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
    }

<<<<<<< HEAD
    var userId = 'FKQDZ9RMsTU53xWbXjBsHFdGcZz1';
    var eventId = '-KWbiYkhG15C2-k5TaqI'
    var refPath = '/users/' + userId + '/events';
    var ref = firebase.database().ref(refPath);
=======
    var eventId = null;
    var ref = firebase.database().ref('events');
>>>>>>> origin/adminform

    $scope.addEvent = function () {
        $scope.input.adminId = userId;
        $scope.input.deadline = $scope.dt.getTime();
        $scope.input.createDate = new Date().getTime();
<<<<<<< HEAD
        ref.push($scope.input);
    }

    $scope.loadEvent = function () {
        var refPath = 'events/' + eventId;
        firebase.database().ref(refPath).once("value").then(function (data) {
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
=======
        eventId = ref.push($scope.input).key;
    };
>>>>>>> origin/adminform

    $scope.editMaxMem = function (i) {
        $scope.input.maxMem += i;
        if ($scope.input.maxMem < 1)
            $scope.input.maxMem = 1;
        if ($scope.input.maxMem < $scope.input.minMem)
            $scope.input.minMem = $scope.input.maxMem;
    }

    $scope.editMinMem = function (i) {
        $scope.input.minMem += i;
        if ($scope.input.minMem > $scope.input.maxMem)
            $scope.input.maxMem = $scope.input.minMem;
        if ($scope.input.minMem < 1)
            $scope.input.minMem = 1;
    }

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
});
