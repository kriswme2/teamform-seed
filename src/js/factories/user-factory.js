angular
  .module('teamform')
  .factory("User", ["firebase", "$firebaseObject", "Auth",function(firebase,$firebaseObject,Auth) {
    var ref = firebase.database().ref("users");
    var currentProfileRef = null;

    var User = {
      setCurrentProfile: function(){
        currentProfileRef = ref.child(Auth.$getAuth().uid);
      },
      getProfile: function(uid){return $firebaseObject(ref.child(uid));
        var users  = $firebaseArray(ref);
        var $profile = users.$getRecord(uid);return  $profile;
        if (!$profile.email)
          return null;

        return $profile;
      },
      updateProfile: function(){
        $profile = {};
        $profile.name = Auth.$getAuth().displayName;
        $profile.email = Auth.$getAuth().email;
        currentProfileRef.set($profile);
      }
    };

    return User;
  }
]);
