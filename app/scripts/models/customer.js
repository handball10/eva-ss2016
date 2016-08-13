'use strict';

/**
 * @ngdoc service
 * @name bookingCalendarApp.Customer
 * @description
 * # Customer
 * Factory in the bookingCalendarApp.
 */
angular.module('bookingCalendarApp')
  .factory('Customer', function () {
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
