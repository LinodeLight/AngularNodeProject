'use strict';

angular.module('app')
    .factory('IdentityService', function(
        $window,
        UserService
    ) {
        var currentUser;
        // bootstrapped object to keep session alive
        if(!!$window.bootstrappedUserObject) {
            currentUser = new UserService();
            angular.extend(currentUser, $window.bootstrappedUserObject);
        }
        return {
            currentUser: currentUser,
            // authentication
            isAuthenticated: function() {
                return !!this.currentUser;
            },

            isAuthorized: function(role) {
                return !!this.currentUser && this.currentUser.role.indexOf(role) > -1;
            }
        }
    });