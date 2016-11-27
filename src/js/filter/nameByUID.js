angular
    .module('teamform')
    .filter("nameByUID", ['User', function (User) {
      var name = {};
      var obj = {};
      function nameFunc(uid) {
        if (name[uid] && name[uid]!=uid) return name[uid];
        if (!name[uid]) name[uid] = uid;
        if (!obj[uid]) {
          obj[uid] = User.childObj(uid);
          obj[uid].$loaded().then(function() {
            name[uid] = obj[uid].name;
          });
        }

        return name[uid];
      }
      nameFunc.$stateful = true;
      return nameFunc;

}]);
