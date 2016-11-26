angular
    .module('teamform')
    .filter("emailByUID", ['User', function (User) {
      var email = {};
      function emailFunc(uid) {
        if (email[uid] && email[uid]!=uid) return email[uid];
        email[uid] = uid;
        obj = User.childObj(uid);
        obj.$loaded().then(function() {
          email[uid] = obj.email;
        });

        return email[uid];
      }
      emailFunc.$stateful = true;
      return emailFunc;

}]);
