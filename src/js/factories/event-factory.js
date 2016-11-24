angular
    .module('teamform')
    .factory('Events', ['firebase', '$firebaseObject', '$firebaseArray', function(firebase, $firebaseObject, $firebaseArray) {
        var ref = firebase.database().ref('events');
        var Events = {
            ref: function() {
                return ref;
            },
            obj: function() {
                return $firebaseObject(ref);
            },
            arr: function() {
                return $firebaseArray(ref);
            },
            childRef: function($eId) {
                return ref.child($eId);
            },
            childObj: function($eId) {
                return $firebaseObject(ref.child($eId));
            },
            push: function($input) {
                return ref.push($input);
            }
        };
        return Events;
    }]);