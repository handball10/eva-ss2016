'use strict';

/**
 * @ngdoc function
 * @name bookingCalendarApp.controller:BookingCtrl
 * @description
 * # BookingCtrl
 * Controller of the bookingCalendarApp
 */
angular.module('bookingCalendarApp')
    .controller('BookingCtrl', function ($scope, $log, $timeout, $rootScope, Booking, Bookings, Resources, Customers, $mdDialog, items) {
        $scope.isResource = false;
        $scope.isDelete = true;
        $scope.sizes = [];
        $scope.size = 1;
        $scope.resourceID;
        $scope.customerID;
        $scope.bookingID;
        $scope.maxSize = 1;

        $scope.resource = {};
        $scope.customer = {};

        //DATE
        $scope.myStartDate = new Date();
        $scope.myEndDate = new Date();

        //AUTOCOMPLETE
        //resources
        var resource = $scope.resource;
        resource.simulateQuery = false;
        Resources.list({bypassCache: true})
            .then(function (list) {
                resource.states = list;
            });

        resource.querySearchResource = function (query) {
            var results = query ? resource.states.filter(createFilterForResource(query)) : resource.states;
            return results;
        };
        resource.selectedResourceItemChange = function (item) {
            fillSizes(item.Size);
            $scope.resourceID = item.Id;
        };

        function createFilterForResource(query) {
            var lowercaseQuery = angular.lowercase(query);
            return function filterFn(state) {
                return (angular.lowercase(state.Name).indexOf(lowercaseQuery) === 0);
            };
        }

        //customer
        var customer = $scope.customer;
        customer.simulateQuery = false;
        Customers.list({bypassCache: true})
            .then(function (list) {
                customer.states = list;
            });

        customer.querySearchCustomer = function (query) {
            var results = query ? customer.states.filter(createFilterForCustomer(query)) : customer.states;
            return results;
        };

        customer.selectedCustomerItemChange = function (item) {
            $scope.customerID = item.Id;
        };


        function createFilterForCustomer(query) {
            var lowercaseQuery = angular.lowercase(query);
            return function filterFn(state) {
                return (angular.lowercase(state.LastName).indexOf(lowercaseQuery) === 0);
            };
        }

        //SIZE
        function fillSizes(maxSize) {
            for (var i = 0; i < maxSize; i++) {
                $scope.sizes[i] = i + 1;
            }
            $scope.isResource = true;
        }

        if(items){

            if(items.start && items.end){
                $scope.myStartDate = items.start.toDate();
                $scope.myEndDate   = items.end.toDate();
                $scope.resourceID  = items.resource.id;

                $log.log(items.resource);

                Resources.find({id : items.resource.id}).then(function(resourceResult){
                    if(resourceResult) {
                        resource.searchText = resourceResult.Name;
                        $scope.size = resourceResult.Size;
                        fillSizes(resourceResult.Size);
                    }else{
                        resource.searchText = "Objekt nicht vorhanden";
                    }
                });
            } else {
                $scope.isDelete = false;
                $scope.bookingID = items;
                Bookings.find({id : items}).then(function(result){
                    $scope.myStartDate = new Date(result.StartDate);
                    $scope.myEndDate = new Date(result.EndDate);
                    $scope.customerID = result.Customer;
                    $scope.resourceID = result.Resource;
                    $scope.bookingID = items;

                    Resources.find({id : result.Resource}).then(function(resourceResult){
                        if(resourceResult) {
                            resource.searchText = resourceResult.Name;
                            $scope.size = resourceResult.Size;
                            fillSizes(resourceResult.Size);
                        }else{
                            resource.searchText = "Objekt nicht vorhanden";
                        }
                    });

                    Customers.find({id : result.Customer}).then(function(customerResult){
                        if(customerResult) {
                            customer.searchText = customerResult.FirstName + " " + customerResult.LastName;
                        }else{
                            customer.searchText = "Kunde nicht vorhanden";
                        }
                    });
                });
            }







        }

        $scope.submit = function () {
            var booking = new Booking({
                Resource: $scope.resourceID,
                StartDate: $scope.myStartDate,
                EndDate: $scope.myEndDate,
                Customer: $scope.customerID,
                Size: $scope.size,
                Id: $scope.bookingID || undefined
            });
            Bookings.upsert(booking);
            $scope.hide();
            $rootScope.$broadcast('showToast');

        };

        $scope.hide = function() {
            $mdDialog.hide();
        };

        $scope.cancel = function() {
            $mdDialog.cancel();
        };
        $scope.delete = function(bookingID){
            var confirm = $mdDialog.confirm()
                .title('Buchung löschen?')
                .textContent('Wollen Sie diese Buchung wirklich löschen?')
                .targetEvent(this)
                .ok('JA')
                .cancel('NEIN');
            $mdDialog.show(confirm).then(function () {
                Bookings.remove(bookingID);
            }, function () {
            });
        }

    });
