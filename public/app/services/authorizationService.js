'use strict';

angular.module('app')
    .factory('AuthorizationService', function(
        $http,
        $q,
        IdentityService,
        UserService
    ) {
        return {
            // AUTHENTICATION AND AUTHORIZATION
            //authentication
            authenticateUser: function(username, password) {
                var dfd = $q.defer();
                $http.post('/login', {username:username, password:password}).then(function (response) {
                    if(response.data.success) {
                        var user = new UserService();
                        angular.extend(user, response.data.user);
                        IdentityService.currentUser = user;
                        dfd.resolve(true);
                    } else {
                        dfd.resolve(false);
                    }
                });
                return dfd.promise;
            },
            //logout
            logoutUser: function() {
                var dfd = $q.defer();
                $http.post('/logout', {logout:true}).then(function() {
                    IdentityService.currentUser = undefined;
                    dfd.resolve();
                });
                return dfd.promise;
            },
            //authorize for specific route based on role
            authorizeCurrentUserForRoute: function(role) {
                if(IdentityService.isAuthorized(role)) {
                    return true;
                } else {
                    return $q.reject('not authorized');
                }
            },
            //limit route to authenticated users
            authorizeAuthenticatedUserForRoute: function() {
                if(IdentityService.isAuthenticated()) {
                    return true;
                } else {
                    return $q.reject('not authorized');
                }
            }
        }
    });