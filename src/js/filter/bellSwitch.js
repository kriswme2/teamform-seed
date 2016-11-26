angular
    .module('teamform')
    .filter("bellSwitch", ['Notification', function (Notification) {
      function checkFunc(state) {
        if (state) {
          isOn = 'on';
        } else {
          isOn = 'default';
        }
        return isOn;
      }
      return checkFunc;

}]);
