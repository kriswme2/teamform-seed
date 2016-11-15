angular
    .module('teamform')
    .factory("Event", ["firebase", "$firebaseArray", function(firebase, $firebaseArray) {
        var ref = firebase.database().ref("events");
        var currentEventRef = null;

        var Event = {
            setCurrentEvent: function(eventId) {
                currentEventRef = ref.child(eventId);
            },

            getEvent: function(eventId) {
                ref.child(eventId).once("value", function(data) {
                    console.log(data);
                });
            },

            updateEvent: function() {
                currentEventRef.once('value', function(data) {
                    $event = {};
                    $event.organizer = data.val().organizer;
                    $event.semester = data.val().semester;
                    $event.course = data.val().course;
                    $event.title = data.val().title;
                    $event.deadline = data.val().deadline;
                    $event.numOfTeam = data.val().numOfTeam;
                    $event.maxMem = data.val().maxMem;
                    $event.minMem = data.val().minMem;
                    $event.privacy = data.val().privacy;
                    $event.desc = data.val().desc;
                    $event.tags = data.val().tags;
                    currentEventRef.set($event);
                });
            },

            newTeam: function(currentEventRef) {
                $eventId = currentEventRef;
            }
        };

        return Event;
    }]);