'use strict';

describe('event-ctrl function', function () {
    describe('EventsCtrl', function () {
        var $scope, controller;

        beforeEach(module('teamform'));

        beforeEach(inject(function ($rootScope, $controller) {
            $scope = $rootScope.$new();
            controller = $controller('EventsCtrl', { $scope: $scope });
        }));

        it('test addEvent', function () {
            var userId = 'ABCDEFGHIJKLMN';
            controller.input.deadline = new Data().getTime();
            controller.input.createDate = new Date().getTime();
        })
    });
});