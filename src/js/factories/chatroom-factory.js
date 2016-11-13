angular
  .module('teamform')
  .factory("Chatroom", ["firebase", "$firebaseArray", "Auth",function(firebase,$firebaseArray,Auth) {
    var ref = firebase.database().ref("chatrooms");
    var norm = new firebase.utils.NormalizedRecord(
       fb.child('chatrooms'),
       [fb.child('users'), 'users', 'chatrooms.user']
    );
    var currentRoom = null;
    var currentRoomRef = null;
    var Chatroom = {
      chroom: function($target){
        currentRoom = $target;
        currentRoomRef = ref.child($target);
        return currentRoomRef;
      },
      send: function($msg){
        if (!currentRoom || !currentRoomRef || !$msg.trim().length)
          return false;

        $newPost = {};
        $newPost.from = Auth.$getAuth().uid;
        $newPost.msg = $msg;
        $newPost.timestamp = firebase.database.ServerValue.TIMESTAMP;
        var post = currentRoomRef.push();
        post.setWithPriority($newPost, firebase.database.ServerValue.TIMESTAMP);
      }
    };

    return Chatroom;
  }
]);
