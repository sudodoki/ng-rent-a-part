'use strict';

/* Directives */


// slider direcive definition.
angular.module('myApp').directive('slider', function () {

      return {

          // works for elements and attributes.
          restrict: 'EA',

          // isolated scope.
          scope: {

              min: '@',			// minimal value
              max: '@',			// maximal value
              step: '@',		// knob drag step
              type: '@',		// slider type: sliderFactory.modes
              trigger: '@',		// update scope trigger: sliderFactory.triggers
              orientation: '@',	// slider orientation: sliderFactory.orientation
              from: '=',		// range from value
              to: '=',			// range to value
              value: '='		// from/to/value modes value
          },

          // logic.
          link: function (scope, element, attrs) {

              // helper functions

              // update on slider value changes.
              function updateOnChange(ev, ui) {

                  scope.$apply(function () {

                      if (scope.type == 'range') {

                          scope.from = ui.values[0];
                          scope.to = ui.values[1];

                      } else {

                          scope.value = ui.value;
                      }
                  });
              };

              // setting default slider.
              var slider = $(element).slider();

              // watches.

              // register scope changes (scope --> slider).
              angular.forEach(['min', 'max', 'step', 'value'], function (prop) {

                  scope.$watch(prop, function (val) {

                      // normalize.
                      if (!angular.isNumber(val)) {

                          val = parseFloat(val);
                      }

                      // validate.
                      if (!angular.isNumber) {

                          return;
                      }

                      // update slider.
                      slider.slider('option', prop, parseFloat(val));
                  });
              });

              // set range value watch.
              scope.$watchCollection('[from, to]', function (vals) {
                  debugger
                  slider.slider('option', 'values', vals);
              });

              // update orientation on changes.
              scope.$watch('orientation', function (val) {

                  // backup old options.
                  var old = slider.slider('option');

                  // setting orientation.
                  old.orientation = val || 'horizontal';

                  // remove old slider.
                  slider.slider('destroy');

                  // regenerate new slider with the new type from old settings.
                  slider = $(element).slider(old);
              });

              // update scope trigger method (change/slide)
              scope.$watch('trigger', function (val) {

                  if (val == 'change') {

                      slider.slider('option', 'slide', null);
                      slider.slider('option', 'change', updateOnChange);

                  } else {

                      slider.slider('option', 'change', null);
                      slider.slider('option', 'slide', updateOnChange);
                  }
              });

              // handle type changes.
              scope.$watch('type', function (val) {

                  // backup old options.
                  var old = slider.slider('option');

                  // ensure slider callbacks attached.
                  if (!old.slide && !old.change) {

                      old.slide = updateOnChange;
                  }

                  // jquery keyboard navigation bug when no step defined.
                  if (isNaN(old.step)) {

                      old.step = 1;
                  };

                  switch (val) {

                      case 'from':

                          if (old.range && old.range != 'min' && old.range != 'max' && old.values) {

                              old.value = old.values[0];
                          }

                          old.values = null;
                          old.range = 'max';
                          break

                      case 'to':

                          if (old.range && old.range != 'min' && old.range != 'max' && old.values) {

                              old.value = old.values[1];
                          }

                          old.values = null;
                          old.range = 'min';
                          break

                      case 'range':

                          if (old.range == 'max') {

                              old.values = [old.value, old.max];

                          } else if (old.range == 'min') {

                              old.values = [old.min, old.value];

                          } else if (!old.range) {

                              if (!(angular.isArray(old.values) && old.values.length == 2)) {

                                  old.values = [old.min, old.max];
                              }
                          }

                          old.value = null;
                          old.range = true;

                          break

                      default:

                          if (old.range && old.range != 'min' && old.range != 'max' && old.values) {

                              old.value = old.values[0];
                          }

                          old.values = null;
                          old.range = false;
                          break;
                  }

                  // remove old slider.
                  slider.slider('destroy');

                  // regenerate new slider with the new type from old settings.
                  slider = $(element).slider(old);
              });
          }
      }
  });
