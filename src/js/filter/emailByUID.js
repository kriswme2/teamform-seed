angular
    .module('teamform')
    .filter("emailByUID", ['User', function (User) {
      var email = {};
      var obj = {};
      function emailFunc(uid) {
        if (email[uid] && email[uid]!=uid) return email[uid];
        if (!email[uid]) email[uid] = uid;
        if (!obj[uid]) {
          obj[uid] = User.childObj(uid);
          obj[uid].$loaded().then(function() {
            email[uid] = obj[uid].email;
          });
        }

        return email[uid];
      }
      emailFunc.$stateful = true;
      return emailFunc;

}]);
