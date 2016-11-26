angular
  .module('teamform')
  .factory("AccessControl", ["firebase", "$firebaseArray", "Auth", "$stateParams", "$q",function(firebase,$firebaseArray,Auth,$stateParams,$q) {
    var eventID = null;
    var ref = firebase.database().ref("accessControls");
    var currentUserRef = null;
    var access = null;

    var AccessControl = {
      setcurrentUser: function () {
        if (!currentUserRef) {
          eventID = $stateParams.eventID;
          currentUserRef = ref.child(eventID).child(Auth.$getAuth().uid);
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
      requireAccess: function() {
        var deferred = $q.defer();
        AccessControl.setcurrentUser();
        currentUserRef.on("value", function(snapshot){
          if (!snapshot.val()) {
            deferred.resolve();
            return ;
          }
          access = snapshot.val().access;
          if (access && access == 'accept') {
            deferred.resolve();
          } else {
            deferred.reject();
          }
        }, function(){
          deferred.reject();
        });
        return deferred.promise;
      },
      $ref: ref,
      access:access
    };

    return AccessControl;
  }
]);
