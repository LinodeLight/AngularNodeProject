angular.module('app')
    .controller('CreateController', function(
        $scope,
        $location,
        Notifier,
        UserMethodService
    ) {
        $scope.role_options = [
            {value:'admin',text:'Admin'}
        ]
        $scope.userCreate = function() {
            var data = {
                name: $scope.name,
                username: $scope.username,
                email: $scope.email,
                password: $scope.password,
                role: [$scope.role_select]
            };

            UserMethodService.createUser(data).then(function() {
                Notifier.notify('User account created!');
                $location.path('/admin/users');
            }, function(reason) {
                Notifier.error(reason);
            })
        };
    });