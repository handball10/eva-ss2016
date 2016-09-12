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

        console.log(items);

        if(items) {
            $scope.isDelete = false;
            $scope.resourceID = items;
            Resources.find({id : items}).then(function(result){
                console.log(result);
               $scope.name = result.Name;
               $scope.size = result.Size;
            });
        }

        $scope.submit = function () {
            var resource = new Resource({
                Size: $scope.size,
                Name: $scope.name,
                Id:   $scope.resourceID || undefined
            });
            Resources.upsert(resource);
            $scope.hide();
            $rootScope.$broadcast('showToast');
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
