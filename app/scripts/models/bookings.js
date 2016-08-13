'use strict';

/**
 * @ngdoc service
 * @name bookingCalendarApp.Bookings
 * @description
 * # Bookings
 * Factory in the bookingCalendarApp.
 */
angular.module('bookingCalendarApp')
    .factory('Bookings', function (Booking, RemoteObject) {
        return RemoteObject.createCollection('Booking', '/bookings', Booking);
    });
