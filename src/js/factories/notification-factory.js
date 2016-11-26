angular
  .module('teamform')
  .factory("Notification", ["firebase", "$firebaseArray", "Auth",function(firebase,$firebaseArray,Auth) {
    var ref = firebase.database().ref("notifications");
    var currentUserRef = null;

    var Notification = {
      setcurrentUser: function () {
        currentUserRef = ref.child(Auth.$getAuth().uid);
      },
      send: function($to, $msg){
        $newNotification = {};
        $newNotification.from = Auth.$getAuth().uid;
        $newNotification.msg = $msg;
        $firebaseArray(ref.child($to).child('box')).$add($newNotification);
      },
      list: function(){
        if (!currentUserRef) Notification.setcurrentUser();
        return currentUserRef.child('box');
      },
      $ref: ref
    };

    return Notification;
  }
]);
