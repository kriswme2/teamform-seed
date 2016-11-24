angular
    .module('teamform')
    .factory('Teams', ['firebase','$firebaseArray', function (firebase,$firebaseArray) {
        var ref = firebase.database().ref('teams');
        var Teams = {
            ref: ref,
            set: function ($eId, $tName, $input) {
                return Teams.childRef($eId, $tName).set($input);
            },
            childRef: function ($eId, $tName) {
                return Teams.ref.child($eId + '/' + $tName);
            },
            arr: function(eventID) {
                return $firebaseArray(Teams.ref.child(eventID));
            },
        };
        return Teams;
    }]);
