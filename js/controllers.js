/* global angular */
(function(){
  'use strict';

  /* Controllers */
  angular.module('myApp').controller('mainController', ['$scope', 'rentalsFactory', 'filterStore', '$window', '$filter', function ($scope, rentalsFactory, filterStore, $window, $filter) {
    $scope.matchedRentals = rentalsFactory;

    $scope.$watch(function(){
      return angular.extend({}, filterStore.filterBase(), filterStore.filterRanges());
    }, function (newValue, oldValue) {
      // rentals | filter:filterBase | filter:filterRanges:rangeCompare could be done in view,
      // but we need it in 3 different places which will make 3 expensive watches thus this $watch
      if (newValue && !angular.equals(newValue, oldValue)) {
        $scope.matchedRentals = $filter('filter')(($filter('filter')(rentalsFactory, filterStore.filterBase())), filterStore.filterRanges(), filterStore.rangeCompare);
      }
    }, true);
  }]);

  angular.module('myApp').controller('filterController', ['$scope', 'rentalsFactory', 'filterStore', '$window', function ($scope, rentalsFactory, filterStore, $window) {
      var roomsQty = [], possiblePrices = [];
      angular.forEach(rentalsFactory, function (appartment) {
        roomsQty.push(appartment.rooms);
        possiblePrices.push(appartment.price);
      });

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
      filterStore.setFilterValues($scope.filterValues);
      function resetFilter(){
        filterStore.reset();
      }
      resetFilter();
      $scope.filterBase = filterStore.filterBase();
      $scope.filterRanges = filterStore.filterRanges();
      $scope.debugFilter = filterStore;
  }]);

})();
