/* global angular */
(function(){
  'use strict';

  /* Controllers */
  angular.module('myApp').controller('mainController', ['$scope', 'rentalsFactory', 'filterStore', '$window', '$filter', function ($scope, rentalsFactory, filterStore, $window, $filter) {
    $scope.matchedRentals = rentalsFactory;
    // Usually, I would tie editMode with URL to trigger separate route
    // but for sake of prototyping, I would go with parentCtrl object & binding to it
    $scope.editMode = {on: false};
    $scope.activateEdit = function () {
      $scope.editMode.on = true;
    };
    $scope.removeById = function (id) {
      // did want to move this to factory, but due to 1.1.5 nature
      // it was just too much trouble, given time constraint
      rentalsFactory = $window.jQuery.grep(rentalsFactory, function (app) {
        return app.id !== id;
      });
    };
    function getFilteredList(appartmentList) {
      return $filter('filter')(($filter('filter')(appartmentList, filterStore.filterBase())), filterStore.filterRanges(), filterStore.rangeCompare);
    }

    $scope.$watch(function(){ return rentalsFactory; }, function(){
      $scope.matchedRentals = getFilteredList(rentalsFactory);
    }, true);

    $scope.$watch(function(){
      return angular.extend({}, filterStore.filterBase(), filterStore.filterRanges());
    }, function (newValue, oldValue) {
      // rentals | filter:filterBase | filter:filterRanges:rangeCompare could be done in view,
      // but we need it in 3 different places which will make 3 expensive watches thus this $watch
      if (newValue && !angular.equals(newValue, oldValue)) {
        $scope.matchedRentals = getFilteredList(rentalsFactory);
      }
    }, true);
  }]);

  angular.module('myApp').controller('filterController', ['$scope', 'rentalsFactory', 'filterStore', '$window', function ($scope, rentalsFactory, filterStore, $window) {
      function calculatePossibleFilterValues() {
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
      }
      $scope.$watch(function () {return rentalsFactory.length; }, calculatePossibleFilterValues);
      function resetFilter(){
        filterStore.reset();
      }
      calculatePossibleFilterValues();
      filterStore.setFilterValues($scope.filterValues);
      resetFilter();
      $scope.filterBase = filterStore.filterBase();
      $scope.filterRanges = filterStore.filterRanges();
  }]);

  angular.module('myApp').controller('newAppartmentController', ['$scope', 'features', 'rentalsFactory', '$window', function ($scope, features, rentalsFactory, $window) {
    $scope.features = angular.copy(features);
    $scope.newEntry = { features: []};
    $scope.toggleSelection = function toggleFeatureSelection(feature) {
      var idx = $scope.newEntry.features.indexOf(feature);
      if (idx > -1) {
        $scope.newEntry.features.splice(idx, 1);
      } else {
        $scope.newEntry.features.push(feature);
      }
    };
    $scope.close = function close(){
      $scope.editMode.on = false;
    };
    $scope.addRoom = function addRoom(newRoom) {
      var ids = $window.jQuery.map(rentalsFactory, function (app) {
        return app.id;
      }), maxId;
      maxId = $window.Math.max.apply($window.Math, ids);
      newRoom.id = maxId + 1;
      rentalsFactory.push(newRoom);
      $scope.newEntry = { features: []};
      $scope.close();
    };
  }]);

})();
