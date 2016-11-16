
/**
 * Route configuration for the RDash module.
 */
angular.module('teamform').config(['$locationProvider', '$stateProvider', '$urlRouterProvider',
    function ($locationProvider, $stateProvider, $urlRouterProvider) {

        $locationProvider.html5Mode(true);

        // For unmatched routes
        $urlRouterProvider.otherwise('/');

        var requireSignInResolver = {
            // controller will not be loaded until $requireSignIn resolves
            // Auth refers to our $firebaseAuth wrapper in the factory below
            "currentAuth": ["Auth", function (Auth) {
                // $requireSignIn returns a promise so the resolve waits for it to complete
                // If the promise is rejected, it will throw a $stateChangeError (see above)
                return Auth.$requireSignIn();
            }]
        };

        var redirectToLoginIfNotSignedIn = ["Auth", "$state", function (Auth, $state) {
            if (!Auth.$getAuth()) {
                $state.go('login');
            }
        }];

        var redirectToIndexIfSignedIn = ["Auth", "$state", function (Auth, $state) {
            if (Auth.$getAuth()) {
                $state.go('index', { "eventID": 'a' });
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
                    "currentAuth": ["Auth", function (Auth) {
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
                    "currentAuth": ["Auth", function (Auth) {
                        // $waitForSignIn returns a promise so the resolve waits for it to complete
                        return Auth.$waitForSignIn();
                    }]
                },
                onEnter: redirectToIndexIfSignedIn
            })
            .state('index', {
                url: '/',
                templateUrl: 'templates/dashboard.html',
                resolve: requireSignInResolver,
                onEnter: redirectToLoginIfNotSignedIn
            })
            .state('event', {
                url: '/events/:eventID',
                templateUrl: 'templates/dashboard.html',
                resolve: requireSignInResolver,
                onEnter: redirectToLoginIfNotSignedIn
            })
            // .state('team', {
            //     url: '/events/:eventID/teams/:teamID',
            //     templateUrl: 'templates/dashboard.html',
            //     resolve: requireSignInResolver,
            //     onEnter: redirectToLoginIfNotSignedIn
            // })
            .state('profile', {
                url: '/profile',
                templateUrl: 'templates/profile.html',
                resolve: requireSignInResolver,
                onEnter: redirectToLoginIfNotSignedIn
            })
            .state('tables', {
                url: '/tables',
                templateUrl: 'templates/tables.html',
                resolve: requireSignInResolver,
                onEnter: redirectToLoginIfNotSignedIn
            })
            .state('admin_event', {
                url: '/new_event',
                templateUrl: 'templates/admin/event.html',
                resolve: requireSignInResolver,
                onEnter: redirectToLoginIfNotSignedIn
            })
            .state('leader_event', {
                url: '/events/:eventID/new_team',
                templateUrl: 'templates/leader/event.html',
                resolve: requireSignInResolver,
                onEnter: redirectToLoginIfNotSignedIn
            })
            // .state('edit_event', {
            //     url: '/events/:eventID/edit',
            //     templateUrl: 'templates/admin/event.html',
            //     resolve: requireSignInResolver,
            //     onEnter: redirectToLoginIfNotSignedIn
            // })
            ;
    }
]);
