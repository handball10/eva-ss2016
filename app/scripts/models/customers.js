'use strict';

/**
 * @ngdoc service
 * @name bookingCalendarApp.Customers
 * @description
 * # Customers
 * Factory in the bookingCalendarApp.
 */
angular.module('bookingCalendarApp')
  .factory('Customers', function () {
    // Service logic
    // ...

    var meaningOfLife = 42;

    // Public API here
    return {
      someMethod: function () {
        return meaningOfLife;
      }
    };
  });
