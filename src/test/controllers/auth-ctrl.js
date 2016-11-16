'use strict';

//
// TODO: Rewrite todo_test.js to achieve 100% statement/branch coverage
//

describe('auth-ctrl', function() {

    beforeEach(module('teamform'));

      beforeEach(inject(function($controller, $rootscope){
      var scope, controller;
      scope = $rootscope.$new();
      AlertsCtrl = $controller('AuthCtrl',{$scope:$scope});

      }));

      
    

});