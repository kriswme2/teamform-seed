angular
  .module('teamform')
  .factory("Notification", ["firebase", "$firebaseArray",function(firebase,$firebaseArray) {
    var ref = firebase.database().ref("notifications");
    var Notification = {
      send: function($from, $to, $msg){
        $newNotification = {};
        $newNotification.from = $from;
        $newNotification.to = $to;
        $newNotification.msg = $msg;
        $firebaseArray(ref).$add($newNotification);
      },
      list: function($uid){
        $notificationsaa = [];
        ref.orderByChild("to").startAt($uid).endAt($uid).on("child_added", function(snapshot) {
          $notificationsaa.push(snapshot.val());
        });
        return $notificationsaa;
      },
      $ref: ref
    };

    return Notification;
  }
]);
