'use strict';

//
// TODO: Rewrite todo_test.js to achieve 100% statement/branch coverage
//

describe('auth-ctrl', function() {

    beforeEach(module('teamform'));

      beforeEach(inject(function($controller, $rootscope){
            var scope, controller;
            scope = $rootscope.$new();
            AuthCtrl = $controller('AuthCtrl',{$scope:$scope});
      }));


		describe('$scope.grade', function() {
		    var $scope, controller;

		    beforeEach(function() {
		      $scope = {};
		      controller = $controller('AuthController', { $scope: $scope });
		    });

		    it('password to be same as confirm password', function() {
		      $scope.password = 'longerthaneightchars';
		      $scope.grade();
		      expect($scope.strength).toEqual('strong');
		    });

		    it('sets the strength to "weak" if the password length <3 chars', function() {
		      $scope.password = 'a';
		      $scope.grade();
		      expect($scope.strength).toEqual('weak');
		    });
		  });

});