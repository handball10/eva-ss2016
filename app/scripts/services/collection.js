'use strict';

/**
 * @ngdoc service
 * @name bookingCalendarApp.Collection
 * @description
 * # Collection
 * Service in the bookingCalendarApp.
 */
angular.module('bookingCalendarApp')
    .service('Collection', function ($window, $q, $log) {

        function Collection(settings){

            if(!settings.name || !settings.path || !settings.Model){
                throw new Error('Collection:: Missing Parameters');
            }

            if(!$window.database){
                throw new Error('Database object not available');
            }

            var self = this;

            this.items = [];

            this.name = settings.name;

            this.path = settings.path;

            this.realtime = settings.realtime;

            this.model = settings.Model;

            var reference = $window.database.ref(this.path);

            function prepareModel(model){
                var data = {};

                _.each(model, function(value, key){

                    if(!_.isFunction(value)){

                        if(typeof value !== 'undefined'){
                            data[key] = _.isDate(value) ? value.getTime() : value;
                        }
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

            };

            this.list = function(){

                var deferred = $q.defer();

                reference
                    .once('value')
                    .then(function(snapshot){

                        var items = [];

                        _.each(snapshot.val(), function(value, key){

                            var properties = {
                                id : key
                            };

                            items.push(
                                new self.model(
                                    _.extend(properties, value)
                                )
                            );
                        });

                        deferred.resolve(items);

                    })
                ;

                return deferred.promise;

            }

        }


        return Collection;

    });
