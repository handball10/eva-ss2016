'use strict';

/**
 * @ngdoc function
 * @name bookingCalendarApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the bookingCalendarApp
 */
angular.module('bookingCalendarApp')
    .controller('MainCtrl', function ($q, $scope, $log, AuthService, Bookings, Booking, $rootScope, $mdMedia, $mdDialog) {

        $scope.isLoggedIn = false;

        $scope.init = function(){
            $scope.isLoggedIn = AuthService.isLoggedIn();
        };


        $scope.saveData = function(){

            var now = moment();

            $log.log(now);

            var booking = new Booking({
                StartDate : now,
                EndDate : now.add(2, 'weeks').clone()
            });


            $log.log(booking);





            Bookings
                .insert(booking)
                .then(function(item){
                    $log.log(item);
                })
            ;
        };































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

        $rootScope.$on("auth::login",onLogin);

        function onLogin(user,event){
            $scope.isLoggedIn = true;
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
                //this should be added to save service
                $rootScope.$broadcast("booking::Booking",function(all){
                    console.log(all);
                });
                $mdDialog.hide(answer);
            };
        }






    });
