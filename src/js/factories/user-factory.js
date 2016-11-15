angular
  .module('teamform')
  .factory("User", ["firebase", "$firebaseArray", "Auth", function (firebase, $firebaseArray, Auth) {
    var ref = firebase.database().ref("users");
    var currentProfileRef = null;

    var User = {
      setCurrentProfile: function () {
        currentProfileRef = ref.child(Auth.$getAuth().uid);
      },
      getProfile: function (uid) {
        console.log(Auth.$getAuth().uid);
        console.log(ref.child(Auth.$getAuth().uid));
        // ref.child(uid).once("value", function(data) {
        //   console.log(data);
        // });
      },
      updateProfile: function () {
        $profile = {};
        $profile.name = Auth.$getAuth().displayName;
        $profile.email = Auth.$getAuth().email;
        currentProfileRef.set($profile);
      }
    };

    return User;
  }
  ]);
