'use strict';
(function(angular) {
  var app = angular.module('app');

  app.service('recepiesService', service);

  service.$inject = ['$http'];
  function service($http) {
    this.getAll = function (data) {
      return $http.get('/api/recipes');
    };

    this.add = function (data) {
      return $http.post('/api/recipe', data);
    };

    this.getById = function (id) {
      return $http.get('/api/recipe/' + id);
    };

    this.delete = function (id) {
      return $http.delete('/api/recipe/' + id);
    };

    this.update = function (data) {
      return $http.put('/api/recipe', data);
    };
  }
})(angular);