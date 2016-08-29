'use strict';

angular.module('app')
    .controller('NavBarController', function(
        $scope,
        $http,
        $location,
        Notifier,
        IdentityService,
        AuthorizationService
    ) {
        $scope.identity = IdentityService;

        $scope.signout = function() {
            AuthorizationService.logoutUser().then(function() {
                $scope.username = "";
                $scope.password = "";
                Notifier.notify('You have successfully signed out!');
                $location.path('/');
            })
        }
    });