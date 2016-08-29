angular.module('app')
    .controller('UpdateController', function(
        $scope,
        $routeParams,
        $location,
        Notifier,
        UserService,
        UserMethodService
    ) {
        $scope.user = UserService.get({_id:$routeParams.id});

        $scope.userUpdate = function() {
            var data = $scope.user;
            if($scope.password && $scope.password.length > 0) {
                if($scope.password === $scope.password_rep) {
                    data.password = $scope.password;
                    UserMethodService.updateUser(data).then(function() {
                        Notifier.notify('User account has been updated');
                        $location.path('/admin/users');
                    }, function(reason) {
                        Notifier.error(reason);
                    });
                }else{
                    Notifier.error('Passwords must match!')
                }
            } else {
                UserMethodService.updateUser(data).then(function() {
                    Notifier.notify('User account has been updated');
                    $location.path('/admin/users');
                }, function(reason) {
                    Notifier.error(reason);
                });
            };
        };

        $scope.userDelete = function() {
            var _id = $scope.user._id;

            UserMethodService.deleteUser(_id).then(function() {
                $location.path('/admin/users');
                Notifier.notify('User account has been deleted');
            }, function(reason) {
                Notifier.error(reason);
            });
        };
    });