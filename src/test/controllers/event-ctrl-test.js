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
            controller.input = {
                organizer: "HKUST",
                semester: "Fall",
                course: "COMP3111",
                title: "COMP3111 Group Project",
                numOfTeam: "10",
                maxMem: 6,
                minMem: 5,
                privacy: "public",
                desc: "teamforming",
                tags: [{"text": "teamform"}]
            };
            var userId = 'ABCDEFGHIJKLMN';
            constructor.dt = new Date();
            controller.addEvent();
            expect(controller)

        })
    });
});