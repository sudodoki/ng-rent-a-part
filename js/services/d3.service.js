(function(){
  'use strict';
  angular.module('myApp').factory('d3', [ '$window', function ($window) {
    return $window.d3;
  }]);

})();