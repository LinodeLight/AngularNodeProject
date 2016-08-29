'use strict';

angular.module('app')
    .factory('UserMethodService', function(
        $http,
        $q,
        IdentityService,
        UserService
    ) {
        return {
            createUser: function(data) {
                var new_user = new UserService(data);
                var dfd = $q.defer();

                new_user.$save().then(function() {
                    dfd.resolve();
                }, function(response) {
                    dfd.reject(response.data.reason);
                });
                return dfd.promise;
            },
            updateUser: function(data) {
                var dfd = $q.defer();
                data.$update().then(function() {
                    dfd.resolve();
                }, function(response) {
                    dfd.reject(response.data.reason);
                });
                return dfd.promise;
            },
            deleteUser: function(_id) {
                var dfd = $q.defer();
                var delete_ID = new UserService();
                delete_ID.id = _id;

                delete_ID.$delete().then(function() {
                    dfd.resolve();
                }, function(response) {
                    dfd.reject(response.data.reason);
                });
                return dfd.promise;
            }
        }
    });