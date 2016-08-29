'use strict';
angular.module('app', [
    'ngResource',
    'ngRoute'
]);

angular.module('app')
    .config(function($routeProvider, $locationProvider) {

        // role checks
        var routeRoleChecks = {
            admin: {auth: function(AuthorizationService) {
                return AuthorizationService.authorizeCurrentUserForRoute('admin')
            }},
            user: {auth: function(AuthorizationService) {
                return AuthorizationService.authorizeAuthenticatedUserForRoute()
            }}
        };

        $locationProvider.html5Mode(true);
        $routeProvider
            .when('/', {
                templateUrl: '/partials/main/main',
                controller: 'MainController'
            })
            .when('/login', {
                templateUrl: '/partials/account/login',
                controller: 'LoginController'
            })
            .when('/profile', {
                templateUrl: '/partials/account/profile',
                controller: 'ProfileController',
                resolve: routeRoleChecks.admin
            })
            .when('/admin/users', {
                templateUrl: '/partials/admin/users/userList',
                controller: 'UserListController',
                resolve: routeRoleChecks.admin
            })
            .when('/admin/user/:id', {
                templateUrl: '/partials/admin/users/update',
                controller: 'UpdateController',
                resolve: routeRoleChecks.admin
            })
            .when('/admin/create', {
                templateUrl: '/partials/admin/users/create',
                controller: 'CreateController',
                resolve: routeRoleChecks.admin
            })
            .otherwise('/', {
                templateUrl: '/partials/main/main',
                controller: 'MainController'
            })
    });

angular.module('app')
    .run(function(
        $rootScope,
        $routeParams,
        $location
    ) {
        $rootScope.$on('$routeChangeError', function(evt, current, previous, rejection) {
            document.body.scrollTop = document.documentElement.scrollTop = 0;
            if(rejection === 'not authorized') {
                $location.path('/');
            }
        });
    });