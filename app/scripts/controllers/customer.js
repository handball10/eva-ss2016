'use strict';

/**
 * @ngdoc function
 * @name bookingCalendarApp.controller:CustomerCtrl
 * @description
 * # CustomerCtrl
 * Controller of the bookingCalendarApp
 */
angular.module('bookingCalendarApp')
  .controller('CustomerCtrl', function ($scope,$rootScope,Customer,Customers) {

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
      console.log("click");
      $scope.answer("customer");
    };

    $rootScope.$on("customer::getCustomer",getCustomer);
    function getCustomer(obj,event){

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


  });
