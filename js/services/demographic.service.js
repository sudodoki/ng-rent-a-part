(function(){
  'use strict';
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
})();