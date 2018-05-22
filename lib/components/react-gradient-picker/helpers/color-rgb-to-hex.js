'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = colorRgbToHEX;

var _convertAlphaParameter = require('./convert-alpha-parameter');

function colorRgbToHEX(rgb) {
  var red = (0, _convertAlphaParameter.convertColorDecParameterToHEX)(rgb.r).toString();
  var green = (0, _convertAlphaParameter.convertColorDecParameterToHEX)(rgb.g).toString();
  var blue = (0, _convertAlphaParameter.convertColorDecParameterToHEX)(rgb.b).toString();
  red = red.length === 1 ? '0' + red : red;
  blue = blue.length === 1 ? '0' + blue : blue;
  green = green.length === 1 ? '0' + green : green;
  return '' + red + green + blue;
}