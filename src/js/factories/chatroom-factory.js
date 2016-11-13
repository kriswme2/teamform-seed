angular
  .module('teamform')
  .factory("Chatroom", ["firebase", "$firebaseArray", "Auth",function(firebase,$firebaseArray,Auth) {
    var ref = firebase.database().ref("chatrooms");
    var currentRoom = null;
    var currentRoomRef = null;
    var Chatroom = {
      chroom: function($target){
        currentRoom = $target;
        currentRoomRef = ref.child($target);
      },
      send: function($msg){
        if (!currentRoom || !currentRoomRef || $msg.trim().length==0)
          return false;

        $newPost = {};
        $newPost.from = Auth.$getAuth().uid;
        $newPost.msg = $msg;
        $newPost.timestamp = firebase.database.ServerValue.TIMESTAMP;
        $firebaseArray(currentRoomRef).$add($newPost);
      }
    };

    return Chatroom;
  }
]);
