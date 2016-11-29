angular
  .module('teamform')
  .factory("Notification", ["firebase", "$firebaseArray", "Auth",function(firebase,$firebaseArray,Auth) {
    var ref = firebase.database().ref("notifications");
    var sendRef = firebase.database().ref("nsendNotifications");
    var currentUserRef = null;

    var Notification = {
      setcurrentUser: function () {
        currentUserRef = ref.child(Auth.$getAuth().uid);
      },
      send: function($to, $msg){
        $newNotification = {};
        receiverRef = ref.child($to);
        $newNotification.from = Auth.$getAuth().email;
        $newNotification.msg = $msg;
        $newNotification.timestamp = firebase.database.ServerValue.TIMESTAMP;
        $firebaseArray(receiverRef.child('box')).$add($newNotification);
        $newNotification.to = $to;
        $firebaseArray(sendRef).$add($newNotification);
        receiverRef.update({new: true});
      },
      list: function(){
        if (!currentUserRef) Notification.setcurrentUser();
        return currentUserRef;
      },
      opened: function(){
        if (!currentUserRef) Notification.setcurrentUser();
        currentUserRef.update({new: false});
      },
      $ref: ref
    };

    return Notification;
  }
]);
