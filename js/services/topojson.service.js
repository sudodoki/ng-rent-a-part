(function(){
  'use strict';
  angular.module('myApp').factory('topojson', [ '$window', function ($window) {
    return $window.topojson;
  }]);

})();