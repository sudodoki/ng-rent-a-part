(function(){
  'use strict';
  //Your code goes here.

  angular.module('myApp').controller('mainController', ['$scope', 'rentalsFactory', 'filterStore', '$window', '$filter', function ($scope, rentalsFactory, filterStore, $window, $filter) {
    var appartments = rentalsFactory.appartments;
    $scope.matchedRentals = appartments;
    // Usually, I would tie editMode with URL to trigger separate route
    // but for sake of prototyping, I would go with parentCtrl object & binding to it
    $scope.editMode = {on: false};
    $scope.activateEdit = function () {
      $scope.editMode.on = true;
    };
    $scope.template_url = 'partials/appartment.html';
    $scope.removeById = rentalsFactory.removeById;
    function getFilteredList(appartmentList) {
      return $filter('filter')(($filter('filter')(appartmentList, filterStore.filterBase())), filterStore.filterAdvanced(), filterStore.rangeCompare);
    }

    $scope.$watch(function(){ return appartments; }, function(){
      $scope.matchedRentals = getFilteredList(appartments);
    }, true);

    $scope.$watch(function(){
      return angular.extend({}, filterStore.filterBase(), filterStore.filterAdvanced());
    }, function (newValue, oldValue) {
      // rentals | filter:filterBase | filter:filterAdvanced:rangeCompare could be done in view,
      // but we need it in 3 different places which will make 3 expensive watches thus this $watch
      if (newValue && !angular.equals(newValue, oldValue)) {
        $scope.matchedRentals = getFilteredList(appartments);
      }
    }, true);
  }]);
})();