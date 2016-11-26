angular
    .module('teamform')
    .controller("EventsCtrl", ['$scope', 'Events', 'Auth', '$stateParams', '$state', 'Tags', EventsCtrl]);

function EventsCtrl($scope, Events, Auth, $stateParams, $state, Tags) {

    var uid = Auth.$getAuth().uid;
    $scope.eventID = $stateParams.eventID;

    $scope.events = Events.arr();
    $scope.event = null;
    $scope.eventObj = null;
    $scope.isEventAdmin = false;

    if ($stateParams.eventID && $state.is("edit_event")) {
        loadEvent($stateParams.eventID);
    }

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
        // tags: [],
        mode: "add",
    };

    $scope.tags = [];

    $scope.$watchCollection("eventID", function () {
        if (!$scope.eventID) return;
        $scope.eventObj = Events.childObj($scope.eventID);
        $scope.eventObj.$loaded().then(function () {
            if ($scope.eventObj.adminId == uid) $scope.isEventAdmin = true;
        });
    });

    function addEvent() {
        if ($scope.input.organizer !== "" && $scope.input.title !== "") {
            $scope.input.adminId = uid;
            $scope.input.deadline = $scope.dt.getTime();
            $scope.input.createDate = new Date().getTime();
            $scope.input.mode = null;
            $scope.eventID = Events.push($scope.input).key;
            Tags.eAdd($scope.eventID, $scope.tags);
            $state.go('event', { "eventID": $scope.eventID });
        }
    }

    $scope.eventFormAction = function () {
        if ($scope.input.mode == "edit") {
            var updatedRecord = {
                organizer: $scope.input.organizer,
                semester: $scope.input.semester,
                course: $scope.input.course,
                title: $scope.input.title,
                deadline: $scope.dt.getTime(),
                numOfTeam: $scope.input.numOfTeam,
                maxMem: $scope.input.maxMem,
                minMem: $scope.input.minMem,
                privacy: $scope.input.privacy,
                desc: $scope.input.desc,
            };
            if ($scope.tags) {
                Tags.eAdd($scope.eventID, $scope.tags);
            }
            $scope.event.update(updatedRecord);
            $state.go('event', { "eventID": $scope.eventID });
        } else {
            addEvent();
        }
    };

    function loadEvent(eId) {
        $scope.eventID = eId;
        $scope.event = Events.childRef(eId);
        $scope.event.once("value").then(function (data) {
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
                    // tags: eData.tags,
                    mode: "edit",
                };
                $scope.dt = new Date(eData.deadline);
            }
            $scope.$apply();
        });
        Tags.eref.child(eId).once("value").then(function (data) {
            if (data.val() !== null)
                $scope.tags = data.val().tags;
            $scope.$apply();
        });
    }

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
