/* global angular */
(function(){
  'use strict';

  /* Controllers */
  angular.module('myApp')
    .controller('mainController', ['$scope', 'rentalsFactory', function ($scope, rentalsFactory) {
      $scope.rentals = rentalsFactory;
    }])
    .controller('filterController', ['$scope', function ($scope) {
    }])
  ;

})();
