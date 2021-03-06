'use strict';

/**
 * @ngdoc service
 * @name bookingCalendarApp.Booking
 * @description
 * # Booking
 * Factory in the bookingCalendarApp.
 */
angular.module('bookingCalendarApp')
    .factory('Booking', function ($log) {

        function Booking(properties){

            $log.log(properties);

            var self = this;

            this.Id         = undefined;
            this.Resource  = undefined;
            this.StartDate  = undefined;
            this.EndDate    = undefined;
            this.Customer       = undefined;
            this.Size       = undefined;
            this.start = undefined;
            this.end    = undefined;


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
                $log.log('extending');

                if(properties.StartDate){
                    properties.start = properties.StartDate;
                }

                if(properties.EndDate){
                    properties.end = properties.EndDate;
                }

                angular.extend(self, properties);
                angular.extend(self, getComputedProperties(properties));
            }

            this.extend = extend;

            extend(properties);
        }


        return Booking;




    });
