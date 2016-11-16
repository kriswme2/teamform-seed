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
          it('', function() {
            var $scope = {};
            var controller = $controller('PasswordController', { $scope: $scope });
            $scope.password = 'longerthaneightchars';
            $scope.grade();
            expect($scope.strength).toEqual('strong');
          });

          it('eventID', function(){
            var $eventID = 1;
            expect(stateParams.eventID).toBe(1);
          });

          it('sets the strength to "weak" if the password length <3 chars', function() {
            var $scope = {};
            var controller = $controller('PasswordController', { $scope: $scope });
            $scope.password = 'a';
            $scope.grade();
            expect($scope.strength).toEqual('weak');
          });
      });

});