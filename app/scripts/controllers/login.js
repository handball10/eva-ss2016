'use strict';

/**
 * @ngdoc function
 * @name bookingCalendarApp.controller:LoginCtrl
 * @description
 * # LoginCtrl
 * Controller of the bookingCalendarApp
 */
angular.module('bookingCalendarApp')
    .controller('LoginCtrl', function ($scope, AuthService,$rootScope,$log) {
        $scope.auth = {
            email : "s@s.de",
            password:"Hallo1234#"
        };

        $scope.submit = function() {
            AuthService
                .authenticate($scope.auth)
                .catch(function(error){
                    $scope.errorMessage = true;
                    $log.log(error);
                })
            ;
        };

        $scope.errorMessage = false;

    });
