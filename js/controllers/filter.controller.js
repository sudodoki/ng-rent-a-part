(function(){
  'use strict';
    angular.module('myApp').controller('filterController', ['$scope', 'rentalsFactory', 'filterStore', '$window', function ($scope, rentalsFactory, filterStore, $window) {
      function updatePossibleFilterValues() {
        filterStore.setFilterValues(calculatePossibleFilterValues());
      }
      function calculatePossibleFilterValues() {
        var roomsQty = [], possiblePrices = [];
        angular.forEach(rentalsFactory, function (appartment) {
          roomsQty.push(appartment.rooms);
          possiblePrices.push(appartment.price);
        });
        return {
          rooms: {
            min: $window.Math.min.apply($window.Math, roomsQty),
            max: $window.Math.max.apply($window.Math, roomsQty)
          },
          price: {
            min: $window.Math.min.apply($window.Math, possiblePrices),
            max: $window.Math.max.apply($window.Math, possiblePrices)
          }
        };
      }
      $scope.$watch(function () {return rentalsFactory.length; }, updatePossibleFilterValues);
      function resetFilter(){
        filterStore.reset();
      }
      updatePossibleFilterValues();
      resetFilter();
      $scope.$watch(filterStore.getPossibleRangeValues, function(newValue){
        $scope.filterValues = newValue;
      }, true);
      $scope.filterBase = filterStore.filterBase();
      $scope.filterRanges = filterStore.filterRanges();
  }]);
})();