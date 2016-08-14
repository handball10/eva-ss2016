'use strict';

/**
 * @ngdoc service
 * @name bookingCalendarApp.Customers
 * @description
 * # Customers
 * Factory in the bookingCalendarApp.
 */
angular.module('bookingCalendarApp')
    .factory('Customers', function (Customer, RemoteObject) {
        return RemoteObject.createCollection('Customer', 'customers', Customer);
    });
