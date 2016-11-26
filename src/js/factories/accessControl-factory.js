angular
  .module('teamform')
  .factory("AccessControl", ["firebase", "$firebaseArray", "Auth", "$stateParams", "$q", '$state',function(firebase,$firebaseArray,Auth,$stateParams,$q,$state) {
    var val = {};
    val.eventID = null;
    val.access = null;
    var ref = firebase.database().ref("accessControls");
    var currentUserRef = null;

    var AccessControl = {
      setcurrentUser: function () {
        if (!currentUserRef) {
          val.eventID = $stateParams.eventID;
          currentUserRef = ref.child(val.eventID).child(Auth.$getAuth().uid);
        }
      },
      get: function(){
        AccessControl.setcurrentUser();
        return currentUserRef;
      },
      set: function($access){
        AccessControl.setcurrentUser();
        currentUserRef.update({access: $access});
      },
      requireAccess: function() {console.log($state);
        var deferred = $q.defer();
        AccessControl.setcurrentUser();
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
