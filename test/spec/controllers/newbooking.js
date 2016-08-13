'use strict';

describe('Controller: NewbookingCtrl', function () {

  // load the controller's module
  beforeEach(module('bookingCalendarApp'));

  var NewbookingCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    NewbookingCtrl = $controller('NewbookingCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
