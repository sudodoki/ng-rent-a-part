/* global angular */
(function(){
  'use strict';

  /* Controllers */
  angular.module('myApp')
    .controller('mainController', ['$scope', 'rentalsFactory', '$window', '$filter', function ($scope, rentalsFactory, $window, $filter) {
      var roomsQty = [], possiblePrices = [];
      $scope.matchedRentals = rentalsFactory;

      angular.forEach(rentalsFactory, function (appartment) {
        roomsQty.push(appartment.rooms);
        possiblePrices.push(appartment.price);
      });

      $scope.$watch(function () {
        return angular.extend({}, $scope.filterBase, $scope.filterRanges)
      }, function (newValue, oldValue) {
        // rentals | filter:filterBase | filter:filterRanges:rangeCompare could be done in view,
        // but we need it in 3 different places which will make 3 expensive watches thus this $watch
        if (newValue && !angular.equals(newValue, oldValue)) {
          $scope.matchedRentals = $filter('filter')(($filter('filter')(rentalsFactory, $scope.filterBase)), $scope.filterRanges, $scope.rangeCompare);
        }
      }, true)


      $scope.filterValues = {
        rooms: {
          min: $window.Math.min.apply($window.Math, roomsQty),
          max: $window.Math.max.apply($window.Math, roomsQty)
        },
        price: {
          min: $window.Math.min.apply($window.Math, possiblePrices),
          max: $window.Math.max.apply($window.Math, possiblePrices)
        }
      };
      $scope.rangeCompare = function(actualValue, rangeObject) {
        return (actualValue >= rangeObject.from) && (actualValue <= rangeObject.to);
      }
      function resetFilter(){
        $scope.filterBase = {};
        $scope.filterRanges = {
          rooms: {
            from: $scope.filterValues.rooms.min,
            to: $scope.filterValues.rooms.max
          },
          price: {
            from: $scope.filterValues.price.min,
            to: $scope.filterValues.price.max
          }
        };
      }
      resetFilter();
    }])
    .controller('filterController', ['$scope', function ($scope) {
      angular.identity($scope);
    }])
  ;

})();
