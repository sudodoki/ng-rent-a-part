(function(){
  'use strict';
  angular.module('myApp').controller('mapController', ['topojson', 'd3', function (topojson, d3) {
    var width = 960, height = 1160;
    var svg = d3.select('#map').append('svg')
              .attr('width', width)
              .attr('height', height);

    d3.json('geo-source/isr.json', function (error, isr) {
      if (error) { return console.error(error); }

      var subunits = topojson.feature(isr, isr.objects.subunits);
      var cities = topojson.feature(isr, isr.objects.places);
      // null projection because topojson handled it for us
      var path = d3.geo.path().projection(null);

      svg.append('path').datum(subunits).attr('d', path).attr('class', 'Israel');

      svg.append('path')
        .datum(cities)
        .attr('d', path)
        .attr('class', 'place');

      svg.selectAll('.place-label')
        .data(cities.features)
        .enter().append('text')
        .attr('class', 'place-label')
        .attr('transform', function(d) {return 'translate(' + d.geometry.coordinates+ ')'; })
        .attr('dx', '.5em')
        .attr('dy', '.35em')
        .text(function (d) { return d.properties.name; });
    });
  }]);
})();