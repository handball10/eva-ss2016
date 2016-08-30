'use strict';

/**
 * @ngdoc function
 * @name bookingCalendarApp.controller:ResourceCtrl
 * @description
 * # ResourceCtrl
 * Controller of the bookingCalendarApp
 */
angular.module('bookingCalendarApp')
    .controller('ResourceCtrl', function ($scope, $mdDialog, items, $rootScope, Resource, Resources) {
        $scope.isDelete = true;
        $scope.resourceID = "";
        $scope.name = "";
        $scope.size = 1;

        if(items) {
            $scope.isDelete = false;
            $scope.resourceID = items.id;
            //TODO get resource from fireabse with id
            //TODO lower and uppercase ID at resources
        }

        $scope.submit = function () {
            var resource = new Resource({
                Size: $scope.size,
                Name: $scope.name,
                id:   $scope.resourceID
            });
            Resources.insert(resource);
        };

        $scope.hide = function () {
            $mdDialog.hide();
        };

        $scope.cancel = function () {
            $mdDialog.cancel();
        };

        $scope.delete = function(resourceID){
            //TODO delete with id
        }


    });
