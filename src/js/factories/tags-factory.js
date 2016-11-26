angular
    .module('teamform')
    .factory('Tags', ['firebase', '$firebaseObject', function (firebase, $firebaseObject) {
        var ref = firebase.database().ref('tags');
        var Tags = {
            ref: ref,
            uref: ref.child('users'),
            eref: ref.child('events'),
            tref: ref.child('teams'),
            uAdd: function ($uId, $tags) {
                Tags.uref.child($uId).child('tags').set($tags);
            },
            eAdd: function ($eId, $tags) {
                Tags.eref.child($eId).child('tags').set($tags);
            },
            tAdd: function ($eId, $tId, $tags) {
                Tags.tref.child($eId).child($tId).child('tags').set($tags);
            }
        };
        return Tags;
    }]);