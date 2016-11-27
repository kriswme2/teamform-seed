angular
  .module('teamform')
  .factory("AccessControl", ["firebase", "$firebaseArray", "Auth", "$q",function(firebase,$firebaseArray,Auth,$q) {
    var val = {};
    val.eventID = null;
    val.access = null;
    var ref = firebase.database().ref("accessControls");
    var currentUserRef = null;
    var deferred = null;

    var AccessControl = {
      setcurrentUser: function (eventID) {
        val.eventID = eventID;
        currentUserRef = ref.child(val.eventID).child(Auth.$getAuth().uid);
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
        AccessControl.setcurrentUser(eventID);
        currentUserRef.on("value", function(snapshot){
          if (snapshot.val()) {
            val.access = snapshot.val().access;
          }
          deferred.resolve();
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
