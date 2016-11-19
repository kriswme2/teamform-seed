angular
    .module('teamform')
    .factory('Teams', ['firebase', function (firebase) {
        var ref = firebase.database().ref('teams');
        var Teams = {
            ref: function () {
                return ref;
            },
            set: function ($eId, $tName, $input) {
                return ref($eId + '/' + $tName).set($input);
            },
            childRef: function ($eId, $tName) {
                return ref.child($eId + '/' + $tName);
            }
        };
        return Teams;
    }]);
