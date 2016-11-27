angular
  .module('teamform')
  .factory('AccessControl', ['firebase', '$firebaseObject', 'Auth', 'Events', '$q',function(firebase,$firebaseObject,Auth,Events,$q) {
    var val = {};
    val.eventID = null;
    val.access = null;
    var ref = firebase.database().ref('accessControls');
    var currentUserRef = null;
    var eventRef = null;
    var deferred = null;

    var AccessControl = {
      init: function ($eventID) {
        val.eventID = $eventID;
        val.access = null;
        currentUserRef = ref.child(val.eventID).child(Auth.$getAuth().uid);
        eventRef = Events.ref();
      },
      obj: function() {
          return $firebaseObject(currentUserRef);
      },
      set: function($eventID, $uid, $access){
        ref.child($eventID).child($uid).update({access: $access});
      },
      listAsked: function () {
        return (ref.child(val.eventID).orderByChild('access').equalTo('asked'));
      },
      requireAccess: function($eventID) {
        if (deferred) deferred.reject('reset promise');
        deferred = $q.defer();
        AccessControl.init($eventID);
        eventRef.orderByKey().equalTo($eventID).on('value', function(snapshot){console.log(snapshot.val()[$eventID].privacy);
          if (!snapshot) {
            deferred.reject('no this event');
          } else if (snapshot.val()[$eventID].privacy == 'public') {
            val.access = 'accepted';
            deferred.resolve();
          } else {
            currentUserRef.on('value', function(snapshot){
              if (snapshot.val()) {
                val.access = snapshot.val().access;
              }
              deferred.resolve();
            }, function(){
              deferred.reject('firebase error');
            });
          }
        }, function(){
          deferred.reject('firebase error');
        });
        return deferred.promise;
      },
      $ref: ref,
      $val: val,
    };

    return AccessControl;
  }
]);
