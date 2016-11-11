function initializeFirebase() {
    var config = {
        apiKey: "AIzaSyBkpMprscaor1-pR8n8MkAJxM4AXlt0ZAs",
        authDomain: "comp3111-group-project.firebaseapp.com",
        databaseURL: "https://comp3111-group-project.firebaseio.com",
        storageBucket: "comp3111-group-project.appspot.com",
        messagingSenderId: "857402819132"
    };
    firebase.initializeApp(config);
}

var app = angular.module("Events", ["firebase", "ui.bootstrap"]);

app.controller("EventsCtrl", function ($scope, $firebaseArray) {

    initializeFirebase();

    $scope.formData = {};
    $scope.data = {};

    $scope.input = {
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
        regDate: null
    }

    var ref = firebase.database().ref("Events");
    $scope.event = $firebaseArray(ref);

    $scope.addEvent = function () {
        // $scope.input.deadline = $scope.data.Date;
        $scope.input.regDate = new Date().toString();
        $scope.event.$add($scope.input);
    }

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

});
