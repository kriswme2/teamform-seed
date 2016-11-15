'use strict';

//
// TODO: Rewrite todo_test.js to achieve 100% statement/branch coverage
//

describe('auth-ctrl', function() {

    beforeEach(module('teamform'));

      beforeEach(inject(function($controller, $rootscope, $stateParams){
      var scope, controller;
      scope = $rootscope.$new();
      AlertsCtrl = $controller('ChatroomCtrl',{$scope:$scope});
      stateParams = $stateParams;
      }));

      it('eventID', function(){
      	var $eventID = 1;
      	expect(stateParams.eventID).toBe(1);
      });
      


      
    

});