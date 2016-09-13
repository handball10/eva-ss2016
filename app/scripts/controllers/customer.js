'use strict';

/**
 * @ngdoc function
 * @name bookingCalendarApp.controller:CustomerCtrl
 * @description
 * # CustomerCtrl
 * Controller of the bookingCalendarApp
 */
angular.module('bookingCalendarApp')
    .controller('CustomerCtrl', function ($scope, $rootScope, Customer, Customers, $mdDialog) {
        $scope.isSearch = true;
        $scope.isDelete = true;
        $scope.customer = {};
        $scope.company = "";
        $scope.birthday = "";
        $scope.firstname = "";
        $scope.lastname = "";
        $scope.street = "";
        $scope.city = "";
        $scope.zipcode = "";
        $scope.email = "";
        $scope.phone = "";
        $scope.custom = "";
        $scope.customerID = "";
        $scope.currentYear = new Date().getFullYear();
        $scope.minYear = 18;
        $scope.maxYear = 100;
        $scope.yearOfBirth = "";
        $scope.yearOfBirths = [];
        $scope.monthOfBirth = "";
        $scope.monthOfBirths = [];
        $scope.dayOfBirth = "";
        $scope.dayOfBirths = [];


        $scope.submit = function () {
            $scope.birthday = new Date($scope.yearOfBirth + '-' + $scope.monthOfBirth + '-' + $scope.dayOfBirth).getTime();
            var customer = new Customer({
                Company: $scope.company,
                FirstName: $scope.firstname,
                LastName: $scope.lastname,
                BirthDate: $scope.birthday,
                Street: $scope.street,
                City: $scope.city,
                ZipCode: $scope.zipcode,
                Email: $scope.email,
                Phone: $scope.phone,
                Custom: $scope.custom,
                Id: $scope.customerID || undefined
            });

            Customers.upsert(customer);
            $scope.hide();
            $rootScope.$broadcast('showToast');
        };

        $scope.showSearchField = function () {
            $scope.isSearch = !$scope.isSearch;
        };

        //BIRTHDAYYEAR
        for (var i = 0; i < ($scope.maxYear - $scope.minYear); i++) {
            $scope.yearOfBirths[i] = $scope.currentYear - i - $scope.minYear;
        }

        //BIRTHDAYMONTH
        for (var j = 0; j < 12; j++) {
            $scope.monthOfBirths[j] = j + 1;
        }

        //BIRTHDAYDAY
        for (var k = 0; k < 31; k++) {
            $scope.dayOfBirths[k] = k + 1;
        }

        //DELETE customerdialog
        $scope.delete = function (customerID) {
            var confirmCustomer = $mdDialog.confirm()
                .title('Kunde löschen?')
                .textContent('Wollen Sie diesen Kunde wirklich löschen?')
                .targetEvent(this)
                .ok('JA')
                .cancel('NEIN');
            $mdDialog.show(confirmCustomer).then(function () {
                Customers.remove(customerID);
            }, function () {
            });
        };


        //AUTOCOMPLETE for search
        var oldCustomer = $scope.customer;
        oldCustomer.simulateQuery = false;
        Customers.list({bypassCache: true})
            .then(function (list) {
                oldCustomer.states = list;
            });

        oldCustomer.querySearchCustomer = function (query) {
            var results = query ? oldCustomer.states.filter(createFilterFor(query)) : oldCustomer.states,
                deferred;
            if (oldCustomer.simulateQuery) {
                deferred = $q.defer();
                $timeout(function () {
                    deferred.resolve(results);
                }, Math.random() * 1000, false);
                return deferred.promise;
            } else {
                return results;
            }
        };

        oldCustomer.selectedCustomerItemChange = function (item) {
            $scope.company = item.Company || "";
            $scope.firstname = item.FirstName;
            $scope.lastname = item.LastName;
            $scope.birthday = item.BirthDate;
            $scope.street = item.Street;
            $scope.city = item.City;
            $scope.zipcode = item.ZipCode;
            $scope.email = item.Email;
            $scope.phone = item.Phone;
            $scope.custom = item.Custom || "";
            $scope.customerID = item.Id;
            $scope.isDelete = false;
            $scope.dayOfBirth = new Date(item.BirthDate).getDate();
            $scope.monthOfBirth = new Date(item.BirthDate).getMonth() + 1;
            $scope.yearOfBirth = new Date(item.BirthDate).getFullYear();
        };

        function createFilterFor(query) {
            var lowercaseQuery = angular.lowercase(query);
            return function filterFn(state) {
                return (angular.lowercase(state.LastName).indexOf(lowercaseQuery) === 0);
            };
        }

        $scope.hide = function () {
            $mdDialog.hide();
        };

        $scope.cancel = function () {
            $mdDialog.cancel();
        };
    });
