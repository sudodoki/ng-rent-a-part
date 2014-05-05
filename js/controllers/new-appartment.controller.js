(function(){
  'use strict';
  angular.module('myApp').controller('newAppartmentController', ['$scope', '$state', 'features', 'rentalsFactory', '$window', function ($scope, $state, features,  rentalsFactory, $window) {
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
      $state.go('list');
    };
    $scope.addAppartment = function addAppartment(newRoom) {
      rentalsFactory.addAppartment(newRoom);
      $scope.newEntry = { features: []};
      $scope.close();
    };
  }]);
})();