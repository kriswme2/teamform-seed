angular.
  module('teamform').
  filter('emailByuid', ["User",
    function(User) {
      return function(input, $scope) {
        var tasks = User.getProfile("7jiVqUTaNGh8m1q0XKxX4EyacOm1");
        tasks.$bindTo($scope).then(function(tasks){
          console.log($scope.uuuu);
        });
      };
    }]);
