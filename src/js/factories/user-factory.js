angular
  .module('teamform')
  .factory("User", ["firebase", "$firebaseArray", "$firebaseObject", "Auth", "Upload", function (firebase, $firebaseArray, $firebaseObject, Auth, Upload) {
    var ref = firebase.database().ref("users");
    var currentProfileRef = null;

    var User = {
      ref: ref,
      childObj: function($uid) {
          return $firebaseObject(User.ref.child($uid));
      },
      currentProfile: function(field) {
        if (!currentProfileRef) {
          User.setCurrentProfile();
        }
        $profile = [];
        currentProfileRef.on("child_added", function(snapshot, field) {console.log(snapshot.key);
          // $profile[snapshot.key] = snapshot.val();console.log($profile);
          if (snapshot.key == 'picture')
          field = snapshot.val();
        });
        return $profile;
      },
      setCurrentProfile: function () {
        currentProfileRef = ref.child(Auth.$getAuth().uid);
      },
      updateProfile: function () {
        $profile = {};
        $profile.name = Auth.$getAuth().displayName;
        $profile.email = Auth.$getAuth().email;
        currentProfileRef.set($profile);
      },
      updatePicture: function(pictureField) {
        Upload.base64DataUrl(pictureField).then(function(base64){
          $profile = {};
          $profile.name = Auth.$getAuth().displayName;
          $profile.email = Auth.$getAuth().email;
          $profile.picture = base64[0];
          ref.child(Auth.$getAuth().uid).set($profile);
        });
      },
    };

    return User;
  }
  ]);
