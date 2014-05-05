(function(){
  'use strict';
  angular.module('myApp').factory('filterStore', function(){
    var factory = this;
    function isSuperset(array1, array2) {
        return array2.every(function (el) { return array1.indexOf(el) >= 0;});
    }
    return {
        rangeCompare: function(actualValue, rangeObject) {
            if (!angular.isArray(rangeObject)) {
                return (actualValue >= rangeObject.from) && (actualValue <= rangeObject.to);
            } else {
                return (rangeObject.length === 0) || isSuperset(actualValue, rangeObject);
            }
        },
        filterBase: function(){
            return factory.filterBase;
        },
        filterAdvanced: function(){
            return factory.filterAdvanced;
        },
        reset: function () {
            factory.filterBase = {};
            factory.filterAdvanced = {};
            for (var rangeName in factory.possibleRangeValues) {
                if (rangeName === 'features') {continue;}
                factory.filterAdvanced[rangeName] = {};
                factory.filterAdvanced[rangeName].from = factory.possibleRangeValues[rangeName].min;
                factory.filterAdvanced[rangeName].to = factory.possibleRangeValues[rangeName].max;
            }
            factory.filterAdvanced.features = [];
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