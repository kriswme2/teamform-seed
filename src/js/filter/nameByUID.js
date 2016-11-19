angular
    .module('teamform')
    .filter("nameByUID", ['User', function (User) {
      var name = {};
      function nameFunc(uid) {
        if (name[uid]) return name[uid];
        obj = User.childObj(uid);
        obj.$loaded().then(function() {
          name[uid] = obj.name;
        });

        return name[uid];
      }
      nameFunc.$stateful = true;
      return nameFunc;

}]);
