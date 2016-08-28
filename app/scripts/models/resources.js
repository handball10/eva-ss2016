'use strict';

/**
 * @ngdoc service
 * @name bookingCalendarApp.Resources
 * @description
 * # Resources
 * Factory in the bookingCalendarApp.
 */
angular.module('bookingCalendarApp')
    .factory('Resources', function (Resource, RemoteObject) {
        return RemoteObject.createCollection('Resource', 'resources', Resource, true);
    });