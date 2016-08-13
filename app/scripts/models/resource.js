'use strict';

/**
 * @ngdoc service
 * @name bookingCalendarApp.Resource
 * @description
 * # Resource
 * Factory in the bookingCalendarApp.
 */
angular.module('bookingCalendarApp')
  .factory('Resource', function () {
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
