/**
 * Route configuration for the RDash module.
 */
angular.module('teamform').config(['$locationProvider', '$stateProvider', '$urlRouterProvider',
    function($locationProvider, $stateProvider, $urlRouterProvider) {

        $locationProvider.html5Mode(true);

        // For unmatched routes
        $urlRouterProvider.otherwise('/');

        var requireSignInResolver = ["Auth", function(Auth) {
            // $requireSignIn returns a promise so the resolve waits for it to complete
            // If the promise is rejected, it will throw a $stateChangeError (see above)
            return Auth.$requireSignIn();
        }];

        var redirectToLoginIfNotSignedIn = ["Auth", "$state", function(Auth, $state) {
            if (!Auth.$getAuth()) {
                $state.go('login');
            }
        }];

        var redirectToIndexIfSignedIn = ["Auth", "$state", function(Auth, $state) {
            if (Auth.$getAuth()) {
                $state.go('index');
            }
        }];

        var AccessControlResolver = ['AccessControl', '$stateParams', function(AccessControl, $stateParams) {
            return AccessControl.requireAccess($stateParams.eventID);
        }];

        var redirectToJoinPageIfNotAccepted = ['AccessControl', '$state', function(AccessControl, $state) {
            redirectToLoginIfNotSignedIn;
            if (!AccessControl.$val.access) {
                $state.go('joinEvent', {
                    "eventID": AccessControl.$val.eventID
                }, {
                    reload: true
                });
            } else if (AccessControl.$val.access && AccessControl.$val.access != 'accepted') {
                $state.go('joinEvent', {
                    "eventID": AccessControl.$val.eventID
                }, {
                    reload: true
                });
            }
        }];

        // Application routes
        $stateProvider
            .state('login', {
                url: '/login',
                templateUrl: 'templates/auth/login.html',
                resolve: {
                    // controller will not be loaded until $waitForSignIn resolves
                    // Auth refers to our $firebaseAuth wrapper in the factory below
                    "currentAuth": ["Auth", function(Auth) {
                        // $waitForSignIn returns a promise so the resolve waits for it to complete
                        return Auth.$waitForSignIn();
                    }]
                },
                onEnter: redirectToIndexIfSignedIn
            })
            .state('register', {
                url: '/register',
                templateUrl: 'templates/auth/register.html',
                resolve: {
                    // controller will not be loaded until $waitForSignIn resolves
                    // Auth refers to our $firebaseAuth wrapper in the factory below
                    "currentAuth": ["Auth", function(Auth) {
                        // $waitForSignIn returns a promise so the resolve waits for it to complete
                        return Auth.$waitForSignIn();
                    }]
                },
                onEnter: redirectToIndexIfSignedIn
            })
            .state('index', {
                url: '/',
                templateUrl: 'templates/dashboard.html',
                resolve: {
                    currentAuth: requireSignInResolver,
                },
                onEnter: redirectToLoginIfNotSignedIn
            })
            .state('joinEvent', {
                url: '/join/{eventID}',
                templateUrl: 'templates/accessControl/join.html',
                resolve: {
                    currentAuth: requireSignInResolver,
                },
                onEnter: redirectToLoginIfNotSignedIn
            })
            .state('new_event', {
                url: '/event/new',
                templateUrl: 'templates/admin/event.html',
                resolve: {
                    currentAuth: requireSignInResolver,
                },
                onEnter: redirectToLoginIfNotSignedIn
            })
            .state('event', {
                url: '/event/:eventID',
                templateUrl: 'templates/event.html',
                params: {
                    eventID: null
                },
                resolve: {
                    currentAuth: requireSignInResolver,
                    accessControl: AccessControlResolver
                },
                onEnter: redirectToJoinPageIfNotAccepted
            })
            .state('edit_event', {
                url: '/event/{eventID}/edit',
                templateUrl: 'templates/admin/event.html',
                resolve: {
                    currentAuth: requireSignInResolver,
                },
                onEnter: redirectToLoginIfNotSignedIn
            })
            .state('new_team', {
                url: '/event/{eventID}/team/new',
                templateUrl: 'templates/leader/event.html',
                resolve: {
                    currentAuth: requireSignInResolver,
                },
                onEnter: redirectToLoginIfNotSignedIn
            })
            .state('team', {
                url: '/event/{eventID}/team/{teamID}',
                templateUrl: 'templates/event.html',
                resolve: {
                    currentAuth: requireSignInResolver,
                },
                onEnter: redirectToLoginIfNotSignedIn
            })
            .state('edit_team', {
                url: '/event/{eventID}/team/{teamID}/edit',
                templateUrl: 'templates/leader/event.html',
                resolve: {
                    currentAuth: requireSignInResolver,
                },
                onEnter: redirectToLoginIfNotSignedIn
            })
            .state('recruit_member', {
                url: '/event/{eventID}/team/{teamID}/recruit',
                templateUrl: 'templates/leader/search.html',
                resolve: {
                    currentAuth: requireSignInResolver,
                },
                onEnter: redirectToLoginIfNotSignedIn
            })
            .state('profile', {
                url: '/profile',
                templateUrl: 'templates/profile.html',
                resolve: {
                    currentAuth: requireSignInResolver,
                },
                onEnter: redirectToLoginIfNotSignedIn
            })
            .state('tables', {
                url: '/tables',
                templateUrl: 'templates/tables.html',
                resolve: {
                    currentAuth: requireSignInResolver,
                },
                onEnter: redirectToLoginIfNotSignedIn
            })
            .state('match', {
                url: '/match',
                templateUrl: 'templates/skillsMatch/skillsMatch.html',
                resolve: {
                    currentAuth: requireSignInResolver,
                },
                onEnter: redirectToLoginIfNotSignedIn
            })
            .state('viewProfile', {
                url: '/profile/{uid}',
                templateUrl: 'templates/profile/view.html',
                resolve: {
                    currentAuth: requireSignInResolver,
                },
                onEnter: redirectToLoginIfNotSignedIn
            })
            .state('debugNoti', {
                url: '/debug-notification',
                templateUrl: 'templates/debug-noti.html',
                resolve: {
                    currentAuth: requireSignInResolver,
                },
                onEnter: redirectToLoginIfNotSignedIn
            });
    }
]);
