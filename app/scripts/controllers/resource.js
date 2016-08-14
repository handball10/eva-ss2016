'use strict';

/**
 * @ngdoc function
 * @name bookingCalendarApp.controller:ResourceCtrl
 * @description
 * # ResourceCtrl
 * Controller of the bookingCalendarApp
 */
angular.module('bookingCalendarApp')
  .controller('ResourceCtrl', function ($scope,$rootScope, Resource, Resources) {


    var resource = {};
    $scope.name = "";
    $scope.size = 0;

    $scope.submit = function(){
      $scope.answer("resource");




        var resource = new Resource({
            Size : $scope.size,
            Name : $scope.name
        });

        Resources.insert(resource);
    };

    $rootScope.$on("resource::getResource",getResource);
    function getResource(obj,event){
      resource.size = $scope.size;
      resource.name = $scope.name;
      event(resource);
    }

  });
