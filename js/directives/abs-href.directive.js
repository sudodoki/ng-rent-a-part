(function() {
  'use strict';
  angular.module('myApp').directive('absHref', ['$window', function (window) {
    // there's no origin in IE, need to redefine in terms of protocol + host to work there
    var baseUrl = window.location.origin + window.location.pathname.replace(/\/(.*\.html)$/, '')
    return {
      restrict: 'A',
      link: function (_, element, attrs) {
        element.attr('href', baseUrl + attrs.absHref)
      }
    }
  }])
})();