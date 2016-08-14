'use strict';

/**
 * @ngdoc function
 * @name bookingCalendarApp.controller:ResourceCtrl
 * @description
 * # ResourceCtrl
 * Controller of the bookingCalendarApp
 */
angular.module('bookingCalendarApp')
  .controller('ResourceCtrl', function ($scope,$rootScope) {
    var resource = {};
    $scope.name = "";
    $scope.size = 0;

    $scope.submit = function(){
      $scope.answer("resource");
    };

    $rootScope.$on("resource::getResource",getResource);
    function getResource(obj,event){
      resource.size = $scope.size;
      resource.name = $scope.name;
      event(resource);
    }

  });
