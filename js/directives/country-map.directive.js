(function() {
    'use strict';
    angular.module('myApp').directive('countryMap', ['d3', 'topojson',
        function(d3, topojson) {
            return {
                restrict: 'A',
                link: function(scope, element, attrs) {
                    var randomId = 'map_' + attrs.countryMap + '_' + ('' + Math.random()).replace('.', '');
                    console.log(randomId)
                    if (!attrs.id) {
                        element.attr('id', randomId)
                    }

                    var width = 960,
                        height = 1160;
                    var svg = d3.select('#' + randomId).append('svg')
                        .attr('width', width)
                        .attr('height', height);

                    d3.json(attrs.source, function(error, isr) {
                        if (error) {
                            return console.error(error);
                        }

                        var subunits = topojson.feature(isr, isr.objects.subunits);
                        var cities = topojson.feature(isr, isr.objects.places);
                        // null projection because topojson handled it for us
                        var path = d3.geo.path().projection(null);

                        svg.append('path').datum(subunits).attr('d', path).attr('class', 'Israel');

                        svg.append('path')
                            .datum(cities)
                            .attr('d', path)
                            .attr('class', 'place')


                        svg.selectAll('.place-label')
                            .data(cities.features)
                            .enter().append('text')
                            .on('mouseover', function() {
                                console.log('mouseover called')
                                d3.select(this)
                                    .transition()
                                    .style('font-size', '40px')
                            })
                            .on('mouseout', function() {
                                d3.select(this)
                                    .style('font-size', '14px')
                            })
                            .on('click', function(data, index) {
                                console.log(data, index, d3.event);
                            })
                            .attr('class', 'place-label')
                            .attr('transform', function(d) {
                                return 'translate(' + d.geometry.coordinates + ')';
                            })
                            .attr('dx', '.5em')
                            .attr('dy', '.35em')
                            .text(function(d) {
                                return d.properties.name;
                            });
                    });
                }
            }
        }
    ]);
})();