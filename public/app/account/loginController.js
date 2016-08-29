'use strict';

angular.module('app')
    .controller('LoginController', function(
        $scope,
        $http,
        $location,
        Notifier,
        IdentityService,
        AuthorizationService
    ) {
        $scope.identity = IdentityService;
        $scope.signin = function(username, password) {
            AuthorizationService.authenticateUser(username, password).then(function(success) {
                if(success) {
                    Notifier.notify('You have successfully signed in!');
                    $location.path('/')
                } else {
                    Notifier.error('Username/Password combination incorrect');
                }
            });
        };
    });