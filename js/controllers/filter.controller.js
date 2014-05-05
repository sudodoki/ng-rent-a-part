(function(){
  'use strict';
    angular.module('myApp').controller('filterController', ['$scope', 'rentalsFactory', 'filterStore', '$window', function ($scope, rentalsFactory, filterStore, $window) {
      var appartments = rentalsFactory.appartments;
      function updatePossibleFilterValues() {
        filterStore.setFilterValues(calculatePossibleFilterValues());
      }
      function calculatePossibleFilterValues() {
        var roomsQty = [], possiblePrices = [], featuresPresent = [];
        angular.forEach(appartments, function (appartment) {
          roomsQty.push(appartment.rooms);
          possiblePrices.push(appartment.price);
          angular.forEach(appartment.features,function(feature){
            if (featuresPresent.indexOf(feature) === -1) {
              featuresPresent.push(feature);
            }
          });
        });
        return {
          rooms: {
            min: $window.Math.min.apply($window.Math, roomsQty),
            max: $window.Math.max.apply($window.Math, roomsQty)
          },
          price: {
            min: $window.Math.min.apply($window.Math, possiblePrices),
            max: $window.Math.max.apply($window.Math, possiblePrices)
          },
          features: featuresPresent
        };
      }
      $scope.$watch(function () {return appartments.length; }, updatePossibleFilterValues);
      function resetFilter(){
        filterStore.reset();
      }
      $scope.toggleSelection = function toggleFeatureSelection(feature) {
        var idx = $scope.filterAdvanced.features.indexOf(feature);
        if (idx > -1) {
          $scope.filterAdvanced.features.splice(idx, 1);
        } else {
          $scope.filterAdvanced.features.push(feature);
        }
      };
      updatePossibleFilterValues();
      resetFilter();
      $scope.$watch(filterStore.getPossibleRangeValues, function(newValue){
        $scope.filterValues = newValue;
      }, true);
      $scope.filterBase = filterStore.filterBase();
      $scope.filterAdvanced = filterStore.filterAdvanced();
  }]);
})();