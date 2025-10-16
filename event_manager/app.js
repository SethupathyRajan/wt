 var app = angular.module('eventApp', []);

    app.service('EventService', function($http) {
      const baseUrl = 'http://localhost:3000';
      this.getEvents = () => $http.get(baseUrl+'/events');
      this.addEvent = (event) => $http.post(baseUrl+'/events', event);
      this.updateEvent = (event) => $http.put(baseUrl+'/events/' + event._id, event);
      this.deleteEvent = (id) => $http.delete(baseUrl+'/events/' + id);
      this.getParticipants = () => $http.get(baseUrl+'/participants');
      this.addParticipant = (p) => $http.post(baseUrl+'/participants', p);
    });

    app.controller('EventController', function($scope, EventService) {
      $scope.events = [];
      $scope.participants = [];
      $scope.event = {};
      $scope.participant = {};
      $scope.editMode = false;

      function loadData() {
        EventService.getEvents().then(res => $scope.events = res.data);
        EventService.getParticipants().then(res => $scope.participants = res.data);
      }

      $scope.addOrUpdateEvent = function() {
        if ($scope.editMode) {
          EventService.updateEvent($scope.event).then(loadData);
        } else {
          EventService.addEvent($scope.event).then(loadData);
        }
        $scope.resetForm();
      };

      $scope.editEvent = function(e) {
        $scope.event = angular.copy(e);
        $scope.editMode = true;
      };

      $scope.resetForm = function() {
        $scope.event = {};
        $scope.editMode = false;
      };

      $scope.deleteEvent = function(id) {
        EventService.deleteEvent(id).then(loadData);
      };

      $scope.registerParticipant = function() {
        $scope.participant.registrationDate = new Date();
        EventService.addParticipant($scope.participant).then(loadData);
        $scope.participant = {};
      };

      loadData();
    });