'use strict';

/**
 * @ngdoc function
 * @name bookingCalendarApp.controller:BookingCtrl
 * @description
 * # BookingCtrl
 * Controller of the bookingCalendarApp
 */
angular.module('bookingCalendarApp')
    .controller('BookingCtrl', function ($scope, $log, $timeout, $rootScope, Booking, Bookings, Resources, Customers) {
        $scope.isResource = false;
        $scope.sizes = [];
        $scope.size = 1;
        $scope.resourceID;
        $scope.customerID;
        $scope.maxSize = 1;

        $scope.resource = {};
        $scope.customer = {};

        //load resources


        //AUTOCOMPLETE
        //resources
        var resource = $scope.resource;
        resource.simulateQuery = false;
        Resources.list()
            .then(function (list) {
                resource.states = list;
            })
        ;
        resource.querySearchResource = function (query) {
            var results = query ? resource.states.filter(createFilterFor(query)) : resource.states,
                deferred;
            if (resource.simulateQuery) {
                deferred = $q.defer();
                $timeout(function () {
                    deferred.resolve(results);
                }, Math.random() * 1000, false);
                return deferred.promise;
            } else {
                return results;
            }
        };
        resource.selectedResourceItemChange = function (item) {
            fillSizes(item.Size);
            $scope.resourceID = item.id;
        };

        //customer
        var customer = $scope.customer;
        customer.simulateQuery = false;
        Customers.list({bypassCache: true})
            .then(function (list) {
                console.log(list);
                customer.states = list;
            })
        ;
        customer.querySearchCustomer = function (query) {
            var results = query ? customer.states.filter(createFilterFor(query)) : customer.states,
                deferred;
            if (customer.simulateQuery) {
                deferred = $q.defer();
                $timeout(function () {
                    deferred.resolve(results);
                }, Math.random() * 1000, false);
                return deferred.promise;
            } else {
                return results;
            }
        };
        customer.selectedCustomerItemChange = function (item) {
            $scope.customerID = item.id;
        };


        function createFilterFor(query) {
            var lowercaseQuery = angular.lowercase(query);
            return function filterFn(state) {
                return (state.Name.indexOf(lowercaseQuery) === 0);
            };
        }

        //DATE
        $scope.myStartDate = new Date();
        $scope.myEndDate = new Date();

        //SIZE
        function fillSizes(maxSize) {

            for (var i = 0; i < maxSize; i++) {
                $scope.sizes[i] = i + 1;
            }
            $scope.isResource = true;
        }

        $scope.submit = function () {
            $scope.answer("booking");
        };

        $rootScope.$on("booking::getBooking", getBooking);
        function getBooking(obj, event) {
            console.log($scope.resource);

            var booking = new Booking({
                Resource: $scope.resourceID,
                StartDate: $scope.myStartDate,
                EndDate: $scope.myEndDate,
                Customer: $scope.customerID,
                Size: $scope.size
            });

            Bookings.insert(booking);

        }


    });
