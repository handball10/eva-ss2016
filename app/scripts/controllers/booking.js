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
      var booking = {};
      $scope.isResource = false;
      $scope.sizes = [];
      $scope.size = 1;
      $scope.name = '';
      $scope.resource;

      //AUTOCOMPLETE
        var self = this;
        self.simulateQuery = false;
        self.isDisabled    = false;
        self.states        = loadAll();
        self.querySearch   = querySearch;
        self.selectedItemChange = selectedItemChange;
        self.searchTextChange   = searchTextChange;
        self.newState = newState;
        function newState(state) {
          alert("Sorry! You'll need to create a Constituion for " + state + " first!");
        }

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
            fillSizes();
            $scope.isResource = true;
          $log.info('Item changed to ' + JSON.stringify(item));
            $scope.resource = item.value;
        }

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

        function createFilterFor(query) {
          var lowercaseQuery = angular.lowercase(query);
          return function filterFn(state) {
            return (state.value.indexOf(lowercaseQuery) === 0);
          };
        }

    //DATE
    $scope.myStartDate = new Date();
    $scope.myEndDate = new Date();

    //SIZE
    var size = 5;
    function fillSizes(){
        for(var i = 0;i<size;i++){
        $scope.sizes[i] = i+1;

        }
    }

  $scope.submit = function(){
      $scope.answer("booking");
  };

  $rootScope.$on("booking::getBooking",getBooking);
  function getBooking(obj,event){
      booking.startTime = $scope.myStartDate;
      booking.endTime = $scope.myEndDate;
      booking.size = $scope.size;
      booking.name = $scope.name;
      booking.resource = $scope.resource;
      event(booking);
  }


  });
