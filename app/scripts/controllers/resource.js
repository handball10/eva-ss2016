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
            Resources.find(items.id).then(function(result){
               console.log(result);
            });
            //TODO get Object with ID
            //TODO lower and uppercase ID at resources item
        }

        $scope.submit = function () {
            var resource = new Resource({
                Size: $scope.size,
                Name: $scope.name,
                ID:   $scope.resourceID || undefined
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
            var confirm = $mdDialog.confirm()
                .title('Kunde löschen?')
                .textContent('Wollen Sie diesen Kunde wirklich löschen?')
                .targetEvent(this)
                .ok('JA')
                .cancel('NEIN');
            $mdDialog.show(confirm).then(function () {
                Resources.remove(resourceID);
            }, function () {
            });
        }


    });
