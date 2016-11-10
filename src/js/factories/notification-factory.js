angular
  .module('teamform')
  .factory("Notification", ["firebase", "$firebaseArray",function(firebase,$firebaseArray) {
    var ref = firebase.database().ref("notifications");
    $teams = $firebaseArray(ref);
    var Notification = {
      send: function($from, $to, $msg){
        $newNotification = {};
        $newNotification.from = $from;
        $newNotification.to = $to;
        $newNotification.msg = $msg;
        $teams.$add($newNotification);
      },
      list: function(){
        return $teams;
      }
    };

    return Notification;
  }
]);
