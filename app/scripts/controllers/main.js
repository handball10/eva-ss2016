'use strict';

/**
 * @ngdoc function
 * @name bookingCalendarApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the bookingCalendarApp
 */
angular.module('bookingCalendarApp')
    .controller('MainCtrl', function ($q, $scope, $log, AuthService, $rootScope, $mdMedia, $mdDialog) {

        $scope.isLoggedIn = false;

        $scope.init = function(){
            $scope.isLoggedIn = AuthService.isLoggedIn();
        };

        $scope.logout = function(){
            AuthService.logout();
        };

        $rootScope.$on("auth::login",onLogin);

        function onLogin(user,event){
            $scope.isLoggedIn = true;
            $log.log(user);
            $log.log(event);
            try{
                $scope.$digest();
            }catch(error){

            }

        }

        $rootScope.$on("auth::logout",onLogout);

        function onLogout(){
            $scope.isLoggedIn = false;
            try{
                $scope.$digest();
            }catch(error){

            }
        }

        $scope.showBookingDialog = function(ev){
          $scope.showDialog(ev,'../../views/modals/booking.html');
        };
        $scope.showCustomerDialog = function(ev){
          $scope.showDialog(ev,'../../views/modals/customer.html');
        };
        $scope.showResourceDialog = function(ev){
          $scope.showDialog(ev,'../../views/modals/resource.html');
        };

        $scope.showDialog = function(ev,dialog) {
            var useFullScreen = ($mdMedia('sm') || $mdMedia('xs'))  && $scope.customFullscreen;
            $mdDialog.show({
                controller: DialogController,
                templateUrl: dialog,
                parent: angular.element(document.body),
                targetEvent: ev,
                clickOutsideToClose:true,
                fullscreen: useFullScreen
            })
                .then(function(answer) {
                    $scope.status = answer;
                }, function() {
                    $scope.status = 'close with bg';
                });
            $scope.$watch(function() {
                return $mdMedia('xs') || $mdMedia('sm');
            }, function(wantsFullScreen) {
                $scope.customFullscreen = (wantsFullScreen === true);
            });
        };

        function DialogController($scope, $mdDialog) {
            $scope.hide = function() {
                $mdDialog.hide();
            };
            $scope.cancel = function() {
                $mdDialog.cancel();
            };
            $scope.answer = function(answer) {
                $mdDialog.hide(answer);
            };
        }






    });
