'use strict';

/**
 * @ngdoc function
 * @name bookingCalendarApp.controller:CustomerCtrl
 * @description
 * # CustomerCtrl
 * Controller of the bookingCalendarApp
 */
angular.module('bookingCalendarApp')
  .controller('CustomerCtrl', function ($scope,$rootScope) {
  var customer = {};

  $scope.company = "";
  $scope.birthday = "";
  $scope.firstname = "";
  $scope.lastname = "";
  $scope.street = "";
  $scope.city = "";
  $scope.postalCode = "";
  $scope.email = "";
  $scope.phone = "";
  $scope.extras = "";




    $scope.submit = function(){
      console.log("click");
      $scope.answer("customer");
    };

    $rootScope.$on("customer::getCustomer",getCustomer);
    function getCustomer(obj,event){
      customer.company = $scope.company;
      customer.birthday = $scope.birthday;
      customer.firstname = $scope.firstname;
      customer.lastname = $scope.lastname;
      customer.street = $scope.street;
      customer.city = $scope.city;
      customer.post = $scope.postalCode;
      customer.email = $scope.email;
      customer.phone = $scope.phone;
      customer.extras = $scope.extras;
      event(customer);
    }


  });
