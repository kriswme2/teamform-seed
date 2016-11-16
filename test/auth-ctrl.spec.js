
describe('auth-ctrl', function() {

  beforeEach(module('teamform'));

  beforeEach(inject(function($controller, $rootscope){
    var scope, controller;
    scope = $rootscope.$new();
    controller = $controller('AuthCtrl',{$scope:$scope});
  }));

	  
      
    

});