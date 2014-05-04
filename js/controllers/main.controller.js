(function(){
  'use strict';
  //Your code goes here.

  angular.module('myApp').controller('mainController', ['$scope', 'rentalsFactory', 'filterStore', '$window', '$filter', function ($scope, rentalsFactory, filterStore, $window, $filter) {
    $scope.matchedRentals = rentalsFactory;
    // Usually, I would tie editMode with URL to trigger separate route
    // but for sake of prototyping, I would go with parentCtrl object & binding to it
    $scope.editMode = {on: false};
    $scope.activateEdit = function () {
      $scope.editMode.on = true;
    };
    $scope.template_url = 'partials/appartment.html';
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
})();