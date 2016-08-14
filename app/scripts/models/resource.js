'use strict';

/**
 * @ngdoc service
 * @name bookingCalendarApp.Resource
 * @description
 * # Resource
 * Factory in the bookingCalendarApp.
 */
angular.module('bookingCalendarApp')
    .factory('Resource', function ($log) {
        function Resource(properties){

            var self = this;

            //this.Id         = undefined;
            //this.Ressource  = undefined;
            this.Size  = undefined;
            this.Name    = undefined;
            //this.Customer   = undefined;


            /**
             * @private
             * @method getComputedProperties
             * @param properties
             */
            function getComputedProperties(properties) {

                // Convert all dateStrings to date Objects
                properties = _.mapValues(properties, function (property, name) {
                    if (!_.isFunction(property) && angular.isDefined(property) && name.indexOf('Date') >= 0) {
                        var m = moment(property);
                        return m.isValid() ? m.toDate() : property;
                    }

                    return property;
                });


                return properties;
            }

            /**
             * @private
             * @method extend
             * @param properties
             */
            function extend(properties) {


                if (!properties) {
                    return;
                }

                angular.extend(self, properties);
                angular.extend(self, getComputedProperties(properties));
            }

            this.extend = extend;

            extend(properties);
        }

        return Resource;
    });
