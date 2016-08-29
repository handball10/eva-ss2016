'use strict';

/**
 * @ngdoc service
 * @name bookingCalendarApp.Collection
 * @description
 * # Collection
 * Service in the bookingCalendarApp.
 */
angular.module('bookingCalendarApp')
    .service('Collection', function ($window, $q, $log, $rootScope) {

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

            this.realtime = settings.realtime || false;

            this.model = settings.Model;

            var reference = $window.database.ref(this.path);

            if(this.realtime){
                bindRealTimeHandlers();
            }

            function bindRealTimeHandlers(){

                reference.on('child_added', dataAdd);
                reference.on('child_changed', dataChange);
                reference.on('child_removed', dataRemove);

                reference.on('value', datasetChange);

            }

            function prepareLifetimeData(data){
                return new self.model(_.extend(data.val(), {Id : data.key}));
            }

            function datasetChange(data){
                $log.log(self.name + '::change', data.val());

                $rootScope.$broadcast(self.name + '::change', data.val());
            }

            function dataAdd(data){

                var newModel = prepareLifetimeData(data);

                self.items.push(newModel);

                $rootScope.$broadcast(self.name + '::added', newModel);
            }

            function dataChange(data){
                $log.log('Changed:: ',data);
            }

            function dataRemove(data){
                $log.log('Removed:: ',data);

                var newModel = prepareLifetimeData(data);

                $rootScope.$broadcast(self.name + '::removed', newModel);
            }

            function prepareModel(model){
                var data = {};

                _.each(model, function(value, key){

                    if(!_.isFunction(value)){

                        if(key === 'id'){
                            return;
                        }

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

                        $log.log(result);

                        deferred.resolve(result);
                    })
                    .catch(function(error){
                        deferred.reject(error);
                    })
                ;

                return deferred.promise;
            };

            this.remove = function(item){

                var id = (item.id || item);

                var modelReference = $window.database.ref(this.path + '/' + id);

                modelReference.remove();
            };

            this.find = function(options){

            };

            /**
             * Returns a list of all data in the reference
             * @returns {*}
             */
            this.list = function(options){

                var deferred = $q.defer();

                if(options && options.bypassCache){
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

                            self.items = items;

                            deferred.resolve(items);

                        })
                    ;
                } else {
                    deferred.resolve(self.items);
                }



                return deferred.promise;

            };

            this.upsert = function(model){

                if(typeof model.id !== 'undefined'){

                    var modelReference = $window.database.ref(this.path + '/' + model.id);

                    modelReference.set(prepareModel(model));
                } else {

                    this.insert(model);
                }

            }








        }


        return Collection;

    });
