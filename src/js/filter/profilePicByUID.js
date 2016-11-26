angular
    .module('teamform')
    .filter("profilePicByUID", ['User', function (User) {
      var profilePic = {};
      function profilePicFunc(uid) {
        if (profilePic[uid]) return profilePic[uid];
        obj = User.childObj(uid);
        obj.$loaded().then(function() {
          profilePic[uid] = obj.picture;
        });

        return profilePic[uid];
      }
      profilePicFunc.$stateful = true;
      return profilePicFunc;

}]);
