'use strict';

/**
 * @ngdoc service
 * @name bookingCalendarApp.RemoteObject
 * @description
 * # RemoteObject
 * Service in the bookingCalendarApp.
 */
angular.module('bookingCalendarApp')
    .service('RemoteObject', function (Collection) {

        var service = {};

        service.createCollection = function(name, path, Model, realtime){

            if(!name || !path || !Model){
                throw new Error('remoteObject:: Missing parameter in Object')
            }

            return new Collection({
                name : name,
                path : path,
                realtime : realtime,
                Model : Model
            });


        };

        return service;




    });

