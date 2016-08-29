'use strict';

angular.module('app')
    .controller('ProfileController', function(
        $scope,
        IdentityService,
        UserMethodService,
        Notifier
    ) {
        $scope.user = IdentityService.currentUser;
        $scope.update = function() {
            var data = $scope.user;
            if($scope.user.password && $scope.user.password.length > 0) {
                data.password = $scope.user.password;
            }
            UserMethodService.updateUser(data).then(function() {
                Notifier.notify('Your user account has been updated');
            }, function(reason) {
                Notifier.notify(reason);
            });
        }
    });