'use strict';

/* Controllers */


angular.module('myApp').controller('mainController', function ($scope, rentalsFactory) {
    debugger
    $scope.rentals = rentalsFactory;

});
