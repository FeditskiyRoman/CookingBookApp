'use strict';

(function(angular) {
  var app = angular.module('app');

  app.config(config);
  config.$inject = [
    '$routeProvider',
    '$httpProvider'
  ];

  function config(
    $routeProvider,
    $httpProvider
  ) {
    $httpProvider.interceptors.push('Interceptor');

    $routeProvider.when('/recepies', {
      controller: 'recepiesCtrl',
      controllerAs: 'vm',
      templateUrl: 'recepies/tpl.html'
    }).when('/recepie/:id?', {
      controller: 'addEditCtrl',
      controllerAs: 'vm',
      templateUrl: 'addEditPage/tpl.html'
    }).when('/', {
      redirectTo: '/recepies'
    }).otherwise({ redirectTo: '/' });
  }
})(angular);