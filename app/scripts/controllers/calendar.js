'use strict';

/**
 * @ngdoc function
 * @name bookingCalendarApp.controller:CalendarCtrl
 * @description
 * # CalendarCtrl
 * Controller of the bookingCalendarApp
 */
angular.module('bookingCalendarApp')
    .controller('CalendarCtrl', function ($scope, $rootScope, Resources, Resource, Bookings, Booking, $log, $mdDialog) {

        var resourceList,
            bookingList,
            calendarInstance
        ;

        $scope.init = function(){


            Resources
                .list({bypassCache : true})
                .then(function(resources){
                    resourceList = _.map(resources, function(item){

                        $log.log(item.id);

                        return {
                            id : item.id,
                            title : item.Name
                        };
                    });

                    $log.log('ResourceList::',resourceList);


                    return Bookings.list({bypassCache : true});
                })
                .then(function(bookings){
                    bookingList = mapBookings(bookings);

                    $log.log(bookingList);


                })
                .finally(function(){

                    calendarInstance = $('#calendar-container');

                    calendarInstance.fullCalendar({
                        now: moment(),
                        editable: true, // enable draggable events
                        droppable: true, // this allows things to be dropped onto the calendar
                        aspectRatio: 1.8,
                        height: $(window).innerHeight() - 100,
                        schedulerLicenseKey: 'CC-Attribution-NonCommercial-NoDerivatives',
                        scrollTime: '00:00', // undo default 6am scrollTime
                        header: {
                            left: 'today prev,next',
                            center: 'title',
                            right : ''
                        },
                        slotEventOverlap : false,
                        eventOverlap : function(){
                            return false
                        },
                        resourceAreaWidth : '20%',
                        timeFormat : 'DD.MM.YYYY',
                        lang : 'de',
                        defaultView: 'timelineMonth',

                        selectable : true,

                        select : selectHandler,
                        eventResize : updateBooking,

                        resourceLabelText: 'Wohnungen',
                        resources: resourceList,
                        events: eventSource,
                        drop: function(date, jsEvent, ui, resourceId) {
                            console.log('drop', date.format(), resourceId);

                            // is the "remove after drop" checkbox checked?
                            if ($('#drop-remove').is(':checked')) {
                                // if so, remove the element from the "Draggable Events" list
                                $(this).remove();
                            }
                        },
                        displayEventTime : true,
                        displayEventEnd : true,
                        eventReceive: function(event) { // called when a proper external event is dropped
                            console.log('eventReceive', event);
                        },
                        eventDrop: updateBooking,
                        eventClick : function( event, jsEvent, view){
                            $scope.showBookingDialog(window,event.id);
                        },

                        resourceRender: resourceRender
                    });

                    bindListeners();
                })
            ;

        };

        function updateBooking(event){

            $log.log(event.Id, event.id);

            var newEvent = {
                Id : event.id || event.Id,
                Resource : event.resourceId,
                StartDate : event.start.toDate(),
                EndDate   : event.end.toDate(),
                Customer  : event.customerId,
                Size : event.size

            };

            $log.log('NEWEVENT', newEvent);

            Bookings.upsert(new Booking(newEvent));
        }

        function eventSource(start, end, timezone, callback){
            callback(bookingList);
        }

        function mapBookings(bookings){

            var bookingsArray = [];

            _.mapKeys(bookings, function(item, key){

                bookingsArray.push({
                    Id : key,
                    id : key,
                    resourceId : item.Resource,
                    start : item.StartDate,
                    end : item.EndDate,
                    customerId : item.Customer,
                    size : item.Size
                });
            });

            return bookingsArray;
        }

        function resourceRender(resource, cell){

            cell.addClass('resourceCell');

            cell.click(function(event){
                $scope.showResourceDialog(window,resource.id);
            });

        }

        function selectHandler(start, end, jsEvent, view, resource){
            $scope.showBookingDialog(window,{start : start, end : end, resource : resource});
        }


        function bindListeners(){

            $rootScope.$on('Resource::added', addRemoteRessource);
            $rootScope.$on('Resource::removed', deleteRemoteResource);
            $rootScope.$on('Resource::changed', updateRemoteResource);


            $rootScope.$on('Booking::dataset', bookingsChanged);

        }

        function bookingsChanged(event, bookings){

            $log.log('Bookings::CHANGE', bookings);

            bookingList = mapBookings(bookings);


            calendarInstance.fullCalendar('refetchEventSources', eventSource);

            $log.log('Bookings::', bookingList);
        }

        function addRemoteRessource(event, addedRessource){
            calendarInstance.fullCalendar('addResource',{
                d : addedRessource.Id,
                title : addedRessource.Name
            });
        }

        function deleteRemoteResource(event, removedResource){
            $log.log('removed', removedResource);
            calendarInstance.fullCalendar('removeResource',removedResource.Id);
        }

        function updateRemoteResource(event){
            calendarInstance.fullCalendar('refetchResources');
        }








    });
