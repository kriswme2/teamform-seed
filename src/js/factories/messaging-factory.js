angular
  .module('teamform')
  .factory("messaging", ["$window", messagingFactory]);

  function messagingFactory($window) {
    return $window.firebase.messaging();
  }
  messagingFactory.$inject = ['$window'];
