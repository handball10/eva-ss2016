'use strict';

/**
 * @ngdoc function
 * @name bookingCalendarApp.controller:CustomerCtrl
 * @description
 * # CustomerCtrl
 * Controller of the bookingCalendarApp
 */
angular.module('bookingCalendarApp')
  .controller('CustomerCtrl', function ($scope,$rootScope,Customer,Customers, $mdDialog) {
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


    $scope.submit = function(){
      $scope.answer("customer");
    };

    $scope.showSearchField = function(){
      $scope.isSearch = !$scope.isSearch;
    };
    //SAVE new Customer
    $rootScope.$on("customer::setCustomer",setCustomer);
    function setCustomer(obj,event){

      var customer = new Customer({
        Company : $scope.company,
        FirstName : $scope.firstname,
        LastName : $scope.lastname,
        BirthDate : $scope.birthday,
        Street : $scope.street,
        City : $scope.city,
        ZipCode : $scope.zipcode,
        Email : $scope.email,
        Phone : $scope.phone,
        Custom : $scope.custom
      });

      Customers.insert(customer);
    }
    //DELETE customerdialog
    $scope.delete = function(customerID){
      var confirm = $mdDialog.confirm()
          .title('Kunde löschen?')
          .textContent('Wollen Sie diesen Kunde wirklich löschen?')
          .targetEvent(this)
          .ok('JA')
          .cancel('NEIN');
      $mdDialog.show(confirm).then(function() {
        //TODO delete customer with customerID
      }, function() {
      });
    };

    //AUTOCOMPLETE for search
    var oldCustomer = $scope.customer;
    oldCustomer.simulateQuery = false;
    Customers.list({bypassCache : true})
        .then(function(list){
          console.log(list);
          oldCustomer.states = list;
        });

    oldCustomer.querySearchCustomer = function (query) {
      var results = query ? oldCustomer.states.filter( createFilterFor(query) ) : oldCustomer.states,
          deferred;
      if (oldCustomer.simulateQuery) {
        deferred = $q.defer();
        $timeout(function () { deferred.resolve( results ); }, Math.random() * 1000, false);
        return deferred.promise;
      } else {
        return results;
      }
    };

    oldCustomer.selectedCustomerItemChange = function(item) {
      console.log("here should be show the customers");
      $scope.company = item.Company;
      $scope.firstname = item.FirstName;
      $scope.lastname = item.LastName;
      $scope.birthday = item.BirthDate;
      $scope.street = item.Street;
      $scope.city = item.City;
      $scope.zipcode = item.ZipCode;
      $scope.email = item.Email;
      $scope.phone = item.Phone;
      $scope.custom = item.Custom;

      $scope.customerID = item.id;
      $scope.isDelete = false;
    };

    function createFilterFor(query) {
      var lowercaseQuery = angular.lowercase(query);
      return function filterFn(state) {
        return (state.Name.indexOf(lowercaseQuery) === 0);
      };
    }


  });
