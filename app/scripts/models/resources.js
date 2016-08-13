'use strict';

/**
 * @ngdoc service
 * @name bookingCalendarApp.Resources
 * @description
 * # Resources
 * Factory in the bookingCalendarApp.
 */
angular.module('bookingCalendarApp')
  .factory('Resources', function () {
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
