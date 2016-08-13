'use strict';

/**
 * @ngdoc service
 * @name bookingCalendarApp.Collection
 * @description
 * # Collection
 * Service in the bookingCalendarApp.
 */
angular.module('bookingCalendarApp')
    .service('Collection', function ($window, $q) {

        function Collection(settings){

            if(!settings.name || !settings.path || !settings.Model){
                throw new Error('Collection:: Missing Parameters');
            }

            if(!$window.database){
                throw new Error('Database object not available');
            }

            var self = this

            ;

            this.items = [];

            this.name = settings.name;

            this.path = settings.path;

            this.realtime = settings.realtime;

            var reference = $window.database.ref(this.path);

            function prepareModel(model){
                var data = {};

                _.each(model, function(value, key){
                    if(!_.isFunction(value)){
                        data[key] = value;
                    }
                });

                return data;

            }

            /**
             *
             * @param model
             * @returns {Promise}
             */
            this.insert = function(model){

                var deferred = $q.defer();

                reference
                    .push(prepareModel(model))
                    .then(function(result){
                        deferred.resolve(result);
                    })
                    .catch(function(error){
                        deferred.reject(error);
                    })
                ;


                return deferred.promise;
            };

            this.remove = function(reference){

            };

            this.find = function(options){

            }









        }


        return Collection;

    });
