'use strict';

/**
 * @ngdoc service
 * @name bookingCalendarApp.Auth
 * @description
 * # Auth
 * Service in the bookingCalendarApp.
 */
angular.module('bookingCalendarApp')
    .service('AuthService', function ($q, $log) {

        /**
         * Service return object that stores all public methods
         * @type {{}}
         */
        var service = {};


        service.authenticate = function(authObject){

            var deferred = $q.defer();

            if(!authObject || !authObject.email || !authObject.password){
                deferred.reject({
                    message : 'Invalid Objects!'
                });

                return deferred.promise;
            }

            firebase
                .auth()
                .signInWithEmailAndPassword(authObject.email, authObject.password)
                .catch(function(error) {

                    deferred.reject({
                        code : error.code,
                        message : error.message
                    });

                })
            ;

            return deferred.promise;
        };

        service.logout = function(){
            firebase.auth().signOut().then(function(){
                $log.log('logged out')
            }, function(){
                $log.log('Not logged in!');
            });
        };

        firebase
            .auth()
            .onAuthStateChanged(function(user){
                if(user){
                    $log.log(user);
                } else {
                    $log.log('Error');
                }

            })
        ;

        return service;








    });
