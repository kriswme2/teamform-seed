
/**
 * Route configuration for the RDash module.
 */
angular.module('teamform').config(['$stateProvider', '$urlRouterProvider',
    function($stateProvider, $urlRouterProvider) {

        // For unmatched routes
        $urlRouterProvider.otherwise('/');

        var requireSignInResolver = {
            // controller will not be loaded until $requireSignIn resolves
            // Auth refers to our $firebaseAuth wrapper in the factory below
            "currentAuth": ["Auth", function(Auth) {
              // $requireSignIn returns a promise so the resolve waits for it to complete
              // If the promise is rejected, it will throw a $stateChangeError (see above)
              return Auth.$requireSignIn();
            }]
        };

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
                }
            })
            .state('register', {
                url: '/register',
                templateUrl: 'templates/auth/register.html'
            })
            .state('index', {
                url: '/',
                templateUrl: 'templates/dashboard.html',
                resolve: requireSignInResolver
            })
            .state('profile', {
                url: '/profile',
                templateUrl: 'templates/profile.html',
                resolve: requireSignInResolver
            })
            .state('tables', {
                url: '/tables',
                templateUrl: 'templates/tables.html',
                resolve: requireSignInResolver
            });
    }
]);