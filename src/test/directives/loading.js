

describe('loading', function() {
		 
      beforeEach(module('teamform'));
      var $scope, controller;
      beforeEach(inject(function($controller, $rootScope){
          $scope = $rootScope.$new();
          controller = $controller('rdLoading',{$scope:$scope});
      
      }));

	  	  
		  it('rdLoading', function() {
          
          expect(controller.rdLoading).toHaveBeenCalled();

		  });



});