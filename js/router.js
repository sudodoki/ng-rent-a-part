(function(){
  'use strict';
  angular.module('myApp').config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/');

    $stateProvider
      .state('list', {
        url: '/',
        views: {
          main: {
            controller: 'mainController',
            templateUrl: 'partials/list-view.html'
          }
        }
      })
      .state('addToList', {
        url: '/add-new',
        views: {
          main: {
            controller: 'mainController',
            templateUrl: 'partials/list-view.html'
          },
          modal: {
            controller: 'newAppartmentController',
            templateUrl: 'partials/new.modal.html'
          }
        }
      })
      .state('map', {
        url: '/map',
        views: {
          main: {
            controller: 'mapController',
            templateUrl: 'partials/map.html'
          }
        }
      })
  }]);
})();