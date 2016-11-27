angular
  .module('teamform')
  .factory("User", ["firebase", "$firebaseArray", "$firebaseObject", "Auth", "Upload", "$state", function (firebase, $firebaseArray, $firebaseObject, Auth, Upload, $state) {
    var ref = firebase.database().ref("users");
    var currentProfileRef = null;

    var User = {
      ref: ref,
      childObj: function($uid) {
          return $firebaseObject(User.ref.child($uid));
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
        return new Promise(function(resolve, reject) {
          Upload.base64DataUrl(pictureField).then(function(base64){
            $profile = {};
            $profile.name = Auth.$getAuth().displayName;
            $profile.email = Auth.$getAuth().email;
            $profile.picture = base64[0];
            ref.child(Auth.$getAuth().uid).set($profile);

            resolve("Success!");
          }).catch(function(error) {
            reject('Upload Profile picture failed!');
          });
        });
      },
    };

    return User;
  }
  ]);
