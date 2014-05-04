/* global angular */
(function(){
    'use strict';

    /* Services */

    angular.module('myApp').factory('demographic', function () {

        return {
            cities: [
                'eilat',
                'ashdod',
                'ashkelon',
                'beer sheva',
                'beit shean',
                'zichron yaakov',
                'hadera',
                'haifa',
                'tveria',
                'jerusalem',
                'lod',
                'metula',
                'naharia',
                'natzrat',
                'netanya',
                'sdom',
                'ein gedi',
                'afula',
                'arad',
                'petach tikva',
                'tzfat',
                'rehovot',
                'ramla',
                'tel aviv'
            ],

            streets: [
                'Arlozorov',
                'Weizmann',
                'Nordow',
                'Katzanelson',
                'Namir'
            ]
        };
    });

    angular.module('myApp').factory('features', function () {

        return ['air condition', 'parking', 'elevator', 'mamad', 'furnished', 'running water'];
    });

    angular.module('myApp').factory('rentalsFactory', [ 'demographic', 'features', function (demo, feat) {

        return [

            {
                id: 0,
                city: demo.cities[0],
                street: demo.streets[0],
                rooms: 3,
                price: 3000,
                features: [
                    feat[0],
                    feat[1],
                    feat[2]
                ]
            },

            {
                id: 1,
                city: demo.cities[1],
                street: demo.streets[1],
                rooms: 3,
                price: 4000,
                features: [
                    feat[2]
                ]
            },

            {
                id: 2,
                city: demo.cities[2],
                street: demo.streets[0],
                rooms: 2,
                price: 3000,
                features: [
                    feat[1],
                    feat[2]
                ]
            },

            {
                id: 3,
                city: demo.cities[3],
                street: demo.streets[0],
                rooms: 5,
                price: 2500,
                features: [
                    feat[2],
                    feat[3],
                    feat[4],
                    feat[5]
                ]
            },

            {
                id: 4,
                city: demo.cities[3],
                street: demo.streets[3],
                rooms: 4,
                price: 3500,
                features: [
                    feat[2],
                    feat[3],
                    feat[4],
                    feat[5]
                ]
            },

            {
                id: 5,
                city: demo.cities[2],
                street: demo.streets[1],
                rooms: 7,
                price: 7000,
                features: [
                    feat[3],
                    feat[5]
                ]
            }
        ];
    }]);
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
            setFilterValues: function (possibleValues) {
                factory.possibleRangeValues = possibleValues;
            }
        };
    });
})();