angular
  .module('teamform')
  .factory("AccessControl", ["firebase", "$firebaseArray", "Auth", "$stateParams", "$q",function(firebase,$firebaseArray,Auth,$stateParams,$q) {
    var val = {};
    val.eventID = null;
    val.access = null;
    var ref = firebase.database().ref("accessControls");
    var currentUserRef = null;

    var AccessControl = {
      setcurrentUser: function () {
        if (!currentUserRef) {console.log('$stateParams');
          val.eventID = $stateParams.eventID;console.log(val.eventID);
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
      requireAccess: function() {
        var deferred = $q.defer();
        AccessControl.setcurrentUser();console.log(val.eventID);
        currentUserRef.on("value", function(snapshot){
          if (!snapshot.val()) {
            deferred.resolve();
            return ;
          }
          access = snapshot.val().access;
          if (access && access == 'accept') {
            deferred.resolve();
          } else {
            deferred.resolve(); //reject
          }
        }, function(){
          deferred.resolve();
        });
        return deferred.promise;
      },
      $ref: ref,
      $val: val,
    };

    return AccessControl;
  }
]);
