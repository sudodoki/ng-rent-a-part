(function(){
  'use strict';
  angular.module('myApp').factory('filterStore', function(){
    var factory = this;
    return {
        rangeCompare: function(actualValue, rangeObject) {
            return (actualValue >= rangeObject.from) && (actualValue <= rangeObject.to);
        },
        filterBase: function(){
            return factory.filterBase;
        },
        filterRanges: function(){
            return factory.filterRanges;
        },
        reset: function () {
            factory.filterBase = {};
            factory.filterRanges = {};
            for (var rangeName in factory.possibleRangeValues) {
                factory.filterRanges[rangeName] = {};
                factory.filterRanges[rangeName].from = factory.possibleRangeValues[rangeName].min;
                factory.filterRanges[rangeName].to = factory.possibleRangeValues[rangeName].max;
            }
        },
        getPossibleRangeValues: function () {
            return factory.possibleRangeValues
        },
        setFilterValues: function (possibleValues) {
            factory.possibleRangeValues = possibleValues;
        }
    };
  });
})();