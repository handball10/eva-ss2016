'use strict';

/**
 * @ngdoc function
 * @name bookingCalendarApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the bookingCalendarApp
 */
angular.module('bookingCalendarApp')
    .controller('MainCtrl', function ($q, $scope, $log, $firebaseAuth) {

        $scope.auth = {
            email : 'test@test.de',
            password : '...'
        };





        var auth = firebase.auth();

        var provider = new firebase.auth.TwitterAuthProvider();
        auth.signInWithPopup(provider).then(function(result) {
            // User signed in!
            var uid = result.user.uid;
        }).catch(function(error) {
            // An error occurred
        });

    });
