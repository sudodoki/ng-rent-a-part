(function(){
  'use strict';
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