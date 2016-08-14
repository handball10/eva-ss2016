'use strict';

/**
 * @ngdoc function
 * @name bookingCalendarApp.controller:CalendarCtrl
 * @description
 * # CalendarCtrl
 * Controller of the bookingCalendarApp
 */
angular.module('bookingCalendarApp')
    .controller('CalendarCtrl', function ($scope, Resources, Resource, Bookings, $log) {

        $scope.init = function(){

            var resourceList,
                bookingList
            ;

            Resources
                .list()
                .then(function(resources){
                    resourceList = _.map(resources, function(item){

                        $log.log(item);

                        return {
                            id : item.id,
                            title : item.Name
                        };
                    });

                    $log.log('ResourceList::',resourceList);

                    return Bookings.list();
                })
                .then(function(bookings){
                    bookingList = _.map(bookings, function(item){
                        return {
                            id : item.Id,
                            resourceId : item.Resource,
                            start : item.StartDate,
                            end : item.EndDate
                        };
                    });


                })
                .finally(function(){
                    $('#calendar-container').fullCalendar({
                        now: moment(),
                        editable: true, // enable draggable events
                        droppable: true, // this allows things to be dropped onto the calendar
                        aspectRatio: 1.8,
                        height: $(window).innerHeight() - 50,
                        schedulerLicenseKey: 'CC-Attribution-NonCommercial-NoDerivatives',
                        scrollTime: '00:00', // undo default 6am scrollTime
                        header: {
                            left: 'today prev,next',
                            center: 'title',
                            right : ''
                        },
                        timeFormat : 'HH:mm',
                        lang : 'de',
                        defaultView: 'timelineMonth',

                        resourceLabelText: 'Rooms',
                        resources: resourceList,
                        events: bookingList,
                        drop: function(date, jsEvent, ui, resourceId) {
                            console.log('drop', date.format(), resourceId);

                            // is the "remove after drop" checkbox checked?
                            if ($('#drop-remove').is(':checked')) {
                                // if so, remove the element from the "Draggable Events" list
                                $(this).remove();
                            }
                        },
                        eventReceive: function(event) { // called when a proper external event is dropped
                            console.log('eventReceive', event);
                        },
                        eventDrop: function(event) { // called when an event (already on the calendar) is moved
                            console.log('eventDrop', event);
                        }
                    });
                })
            ;

        };

        function getResources(){
            Resources
                .list()
        }








    });
