(function(){
'use strict';
  angular.module('myApp').factory('rentalsFactory', [ 'demographic', 'features', function (demo, feat) {
    var latestId = 0;
    var fixtures = [
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
    angular.forEach(fixtures, function (appartment) {
        appartment.id = latestId++;
    });
    return {
        appartments: fixtures,
        addAppartment: function (newAppartment) {
            newAppartment.id = latestId++;
            fixtures.push(newAppartment);
        },
        removeById: function (id) {
            var index = fixtures.map(function(app){return app.id}).indexOf(id);
            if (index > -1) {
                fixtures.splice(index, 1);
                return true;
            }
            return false;
        }
    };
  }]);
})();