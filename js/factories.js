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
        }
    });

    angular.module('myApp').factory('features', function () {

        return ['air condition', 'parking', 'elevator', 'mamad', 'furnished', 'running water'];
    });

    angular.module('myApp').factory('rentalsFactory', [ 'demographic', 'features', function (demo, feat) {

        return [

            {
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
                city: demo.cities[1],
                street: demo.streets[1],
                rooms: 3,
                price: 4000,
                features: [
                    feat[2]
                ]
            },

            {
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

})();