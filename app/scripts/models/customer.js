'use strict';

/**
 * @ngdoc service
 * @name bookingCalendarApp.Customer
 * @description
 * # Customer
 * Factory in the bookingCalendarApp.
 */
angular.module('bookingCalendarApp')
    .factory('Customer', function () {
        function Customer(properties){
            var isDlgOpen = false;
            var self = this;

            this.Id         = undefined;
            this.Company    = undefined;
            this.BirthDate  = undefined;
            this.FirstName  = undefined;
            this.LastName   = undefined;
            this.Street     = undefined;
            this.City       = undefined;
            this.ZipCode    = undefined;
            this.Email      = undefined;
            this.Phone      = undefined;
            this.Custom     = undefined;


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


        return Customer;
    });
