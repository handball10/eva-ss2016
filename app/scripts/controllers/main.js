'use strict';

/**
 * @ngdoc function
 * @name bookingCalendarApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the bookingCalendarApp
 */
angular.module('bookingCalendarApp')
    .controller('MainCtrl', function ($q, $scope, $log, AuthService) {

        $scope.auth = {
            email : '',
            password : ''
        };


        $scope.submit = function() {
            AuthService
                .authenticate($scope.auth)
                .catch(function(error){
                    $log.log(error);
                })
            ;
        };

        $scope.logout = function(){
            AuthService.logout();
        };





    });
