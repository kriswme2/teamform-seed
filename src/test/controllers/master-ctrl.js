'use strict';

//
// TODO: Rewrite todo_test.js to achieve 100% statement/branch coverage
//

describe('master ctrl', function() {

    beforeEach(module('teamform'));

      beforeEach(inject(function($controller, $rootscope){
            var scope, controller;
            scope = $rootscope.$new();
            AuthCtrl = $controller('MasterCtrl',{$scope:$scope});
      }));


		describe('Master Ctrl', function() {
		    var $scope, controller;

		    beforeEach(function() {
		      $scope = {};
		      controller = $controller('MasterCtrl', { $scope: $scope });
		    });

				it('should expect scope.getSize() to have been called on window resize', function () {
				    spyOn(element.isolateScope(), 'getSize');
				    $window.innerWidth = 1026;
				    angular.element($window).triggerHandler('resize');
				    $scope.$digest();
				    expect(element.isolateScope().getSize).toHaveBeenCalled();
				});

		  });

});