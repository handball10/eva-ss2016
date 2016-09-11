'use strict';

/**
 * @ngdoc function
 * @name bookingCalendarApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the bookingCalendarApp
 */
var isDlgOpen;

angular.module('bookingCalendarApp',['ngMaterial'])
    .controller('MainCtrl', function ($q, $scope, $log, AuthService, Bookings, Booking, $rootScope, $mdMedia, $mdDialog, $mdToast) {
        $scope.toastText = "Gespeichert!";
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


            //firebase.database().ref('bookings/').push({
            //    username: 'Test',
            //    email: 'TEST@web.de'
            //});

            //firebase.database().ref('bookings/').push({
            //        StartDate : 'Hallo',
            //        EndDate : 'Hallo'
            //    })
            //    .then(function(){
            //
            //    });
            //;

            //$log.log(booking);





            Bookings
                .insert(booking)
                .then(function(item){
                    $log.log(item);

                    return Bookings.list();
                })
                .then(function(list){
                    $log.log(list);
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
            var LogoutConfirm = $mdDialog.confirm()
                .title('Logout?')
                .textContent('Wollen Sie sich wirklich abmelden?')
                .targetEvent(this)
                .ok('JA')
                .cancel('NEIN');
            $mdDialog.show(LogoutConfirm).then(function () {
                AuthService.logout();
            }, function () {
            });

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

        $scope.showCustomToast = function() {
            $mdToast.show({
                hideDelay   : 3000,
                position    : 'bottom right',
                controller  : 'ToastCtrl',
                templateUrl : '../../views/toasts/toast.html'
            });
        };


        $scope.showBookingDialog = function(ev,Id){
          $scope.showDialog(ev,'../../views/modals/booking.html','BookingCtrl',Id);
        };
        $scope.showCustomerDialog = function(ev){
          $scope.showDialog(ev,'../../views/modals/customer.html','CustomerCtrl');
        };
        $scope.showResourceDialog = function(ev,Id){
          $scope.showDialog(ev,'../../views/modals/resource.html','ResourceCtrl',Id);
        };

        $scope.showDialog = function(ev,dialog, myController,Id) {
            var useFullScreen = ($mdMedia('sm') || $mdMedia('xs'))  && $scope.customFullscreen;
            $mdDialog.show({
                locals : {
                    items : Id || false
                },
                bindToController : true,
                controller: myController,
                templateUrl: dialog,
                parent: angular.element(document.body),
                targetEvent: ev,
                clickOutsideToClose:true,
                fullscreen: useFullScreen

            })
                .then(function(answer) {
                    if(typeof answer == String) {
                        $scope.showCustomToast();
                    }
                }, function() {
                    //if canceled
                });
            $scope.$watch(function() {
                return $mdMedia('xs') || $mdMedia('sm');
            }, function(wantsFullScreen) {
                $scope.customFullscreen = (wantsFullScreen === true);
            });
        };
    })
    .controller('ToastCtrl', function($scope, $mdToast, $mdDialog) {
        $scope.closeToast = function() {
            if (isDlgOpen) return;
            $mdToast
                .hide()
                .then(function() {
                    isDlgOpen = false;
                });
        };
        $scope.openMoreInfo = function(e) {
            if ( isDlgOpen ) return;
            isDlgOpen = true;
            $mdDialog
                .show($mdDialog
                    .alert()
                    .title('More info goes here.')
                    .textContent('Something witty.')
                    .ariaLabel('More info')
                    .ok('Got it')
                    .targetEvent(e)
                )
                .then(function() {
                    isDlgOpen = false;
                })
        };
    });
