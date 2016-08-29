'use strict';

angular.module('app')
    .controller('MainController', function (
        $scope,
        IdentityService
    ) {
        $scope.current_user = IdentityService.currentUser;
    });