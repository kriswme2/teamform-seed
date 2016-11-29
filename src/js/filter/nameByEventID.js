angular
    .module('teamform')
    .filter("nameByEventID", ['Events', function (Events) {
      var name = {};
      var obj = {};
      function nameFunc(eventID) {
        if (name[eventID] && name[eventID]!=eventID) return name[eventID];
        if (!name[eventID]) name[eventID] = eventID;
        if (!obj[eventID]) {
          obj[eventID] = Events.childObj(eventID);
          obj[eventID].$loaded().then(function() {
            name[eventID] = obj[eventID].title;
          });
        }

        return name[eventID];
      }
      nameFunc.$stateful = true;
      return nameFunc;

}]);
