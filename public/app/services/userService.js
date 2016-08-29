'use strict';

angular.module('app')
    .factory('UserService', function($resource) {
        var resource = $resource('/api/users/:_id', {_id: "@id"}, {
            update: {method: 'PUT', isArray:false}
        });

        resource.prototype.isAdmin = function() {
            return this.roles && this.roles.indexOf('admin') > -1;
        };

        return resource;
    });