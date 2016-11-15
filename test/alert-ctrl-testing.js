'use strict';

//
// TODO: Rewrite todo_test.js to achieve 100% statement/branch coverage
//

describe('AlertsCtrl', function() {
		 
      beforeEach(module('teamform'));
      var scope, controller;
      beforeEach(inject(function($controller, $rootScope){
          scope = $rootScope.new();
          controller = $controller('AlertsCtrl',{$scope:$scope});
      
      }));

	  	  
		  it('alerts', function() {
        
          scope.addAlert();
          expect(scope.alerts).toHaveBeenCalled();

		  });

      it('addAlert', function(){

          expect(scope.alerts.push).toHaveBeenCalled();


      });

      it('closeAlert', function(){

        expect(scope.alerts.splice).toHaveBeenCalled();
        

      });


		  
		



});