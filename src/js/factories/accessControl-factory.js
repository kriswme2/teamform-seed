angular
  .module('teamform')
  .factory('AccessControl', ['firebase', '$firebaseArray', 'Auth', 'Events', '$q',function(firebase,$firebaseArray,Auth,Events,$q) {
    var val = {};
    val.eventID = null;
    val.access = null;
    var ref = firebase.database().ref('accessControls');
    var currentUserRef = null;
    var eventRef = null;
    var deferred = null;

    var AccessControl = {
      init: function (eventID) {
        val.eventID = eventID;
        currentUserRef = ref.child(val.eventID).child(Auth.$getAuth().uid);
        eventRef = Events.ref();
      },
      get: function(){
        return currentUserRef;
      },
      set: function($access){
        currentUserRef.update({access: $access});
      },
      requireAccess: function(eventID) {
        if (deferred) deferred.reject('reset promise');
        deferred = $q.defer();
        AccessControl.init(eventID);
        eventRef.orderByKey().equalTo(eventID).on('value', function(snapshot){console.log(snapshot.val()[eventID].privacy);
          if (!snapshot) {console.log('reject');
            deferred.reject('no this event');
          } else if (snapshot.val()[eventID].privacy == 'public') {
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
