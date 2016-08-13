'use strict';

/**
 * @ngdoc function
 * @name bookingCalendarApp.controller:BookingCtrl
 * @description
 * # BookingCtrl
 * Controller of the bookingCalendarApp
 */
angular.module('bookingCalendarApp')
  .controller('BookingCtrl', function ($scope,$log,$timeout,$rootScope) {
      $scope.booking = {};


        var self = this;
        self.simulateQuery = false;
        self.isDisabled    = false;
        // list of `state` value/display objects
        self.states        = loadAll();
        self.querySearch   = querySearch;
        self.selectedItemChange = selectedItemChange;
        self.searchTextChange   = searchTextChange;
        self.newState = newState;
        function newState(state) {
          alert("Sorry! You'll need to create a Constituion for " + state + " first!");
        }
        // ******************************
        // Internal methods
        // ******************************
        /**
         * Search for states... use $timeout to simulate
         * remote dataservice call.
         */
        function querySearch (query) {
          var results = query ? self.states.filter( createFilterFor(query) ) : self.states,
              deferred;
          if (self.simulateQuery) {
            deferred = $q.defer();
            $timeout(function () { deferred.resolve( results ); }, Math.random() * 1000, false);
            return deferred.promise;
          } else {
            return results;
          }
        }
        function searchTextChange(text) {
          $log.info('Text changed to ' + text);
        }
        function selectedItemChange(item) {
          $log.info('Item changed to ' + JSON.stringify(item));
            $scope.booking.resource = item.value;
        }
        /**
         * Build `states` list of key/value pairs
         */


        function loadAll() {
          var allStates = 'Alabama, Alaska, Arizona, Arkansas, California, Colorado, Connecticut, Delaware,\
              Florida, Georgia, Hawaii, Idaho, Illinois, Indiana, Iowa, Kansas, Kentucky, Louisiana,\
              Maine, Maryland, Massachusetts, Michigan, Minnesota, Mississippi, Missouri, Montana,\
              Nebraska, Nevada, New Hampshire, New Jersey, New Mexico, New York, North Carolina,\
              North Dakota, Ohio, Oklahoma, Oregon, Pennsylvania, Rhode Island, South Carolina,\
              South Dakota, Tennessee, Texas, Utah, Vermont, Virginia, Washington, West Virginia,\
              Wisconsin, Wyoming';
          return allStates.split(/, +/g).map( function (state) {
            return {
              value: state.toLowerCase(),
              display: state
            };
          });
        }
        /**
         * Create filter function for a query string
         */
        function createFilterFor(query) {
          var lowercaseQuery = angular.lowercase(query);
          return function filterFn(state) {
            return (state.value.indexOf(lowercaseQuery) === 0);
          };
        }


    $scope.myStartDate = new Date();
    $scope.myEndDate = new Date();


   $scope.$watch('myStartDate', function(newValue, oldValue){
     console.log(oldValue);
     console.log(newValue);
   });

  $scope.$watch('myEndDate', function(newValue, oldValue){
      console.log(oldValue);
      console.log(newValue);
  });


      $scope.personSize = null;
      $scope.personSizes = null;
      $scope.loadPersonSizes = function() {
          // Use timeout to simulate a 650ms request.
          return $timeout(function () {
              $scope.personSizes = $scope.personSizes || [
                      {id: 1, name: 1},
                      {id: 2, name: 2},
                      {id: 3, name: 3},
                      {id: 4, name: 4},
                      {id: 5, name: 5}
                  ];
          }, 650);
      };

      $scope.booking.name = '';

      //for save service after clicking okay
      $rootScope.$on("booking::getBooking",getBooking);

      function getBooking(temp,event){
          $scope.booking.startTime = $scope.myStartDate;
          $scope.booking.endTime = $scope.myEndDate;
          $scope.booking.personSize = $scope.personSize.id;
          event($scope.booking);
      }

  });
