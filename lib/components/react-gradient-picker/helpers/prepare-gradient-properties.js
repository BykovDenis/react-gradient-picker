'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.encodeGradientProperties = encodeGradientProperties;
exports.decodeGradientProperties = decodeGradientProperties;
exports.sortCollectionGradient = sortCollectionGradient;

var _collection = require('lodash/collection');

var _colorHexToRgb = require('./color-hex-to-rgb');

var _colorHexToRgb2 = _interopRequireDefault(_colorHexToRgb);

var _colorRgbToHex = require('./color-rgb-to-hex');

var _colorRgbToHex2 = _interopRequireDefault(_colorRgbToHex);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function getStepsArray(data) {
  return Object.keys(data).map(function (index) {
    return data[index].step;
  });
}

function getMinMaxElements(arrayElement) {
  var min = arrayElement[0];
  var max = arrayElement[arrayElement.length - 1];
  arrayElement.forEach(function (element) {
    if (min > element) {
      min = element;
    }
    if (max < element) {
      max = element;
    }
  });
  return { min: min, max: max };
}

function getStepToPercent(value, maxVaue) {
  return value * 100 / maxVaue;
}

function getPercentToStep(percent, maxValue) {
  return percent * maxValue / 100;
}

function encodeGradientProperties(colorsProperties) {
  var styleGradientPanel = 'linear-gradient(to right';
  var data = [];
  var max = 0;
  if (colorsProperties) {
    var steps = getStepsArray(colorsProperties);
    var minMax = getMinMaxElements(steps);
    var i = 0;
    Object.keys(colorsProperties).forEach(function (index) {
      var _colorsProperties$ind = colorsProperties[index],
          step = _colorsProperties$ind.step,
          color = _colorsProperties$ind.color,
          alpha = _colorsProperties$ind.alpha;

      max = parseFloat(minMax.max);
      var percentStep = getStepToPercent(step, max);
      var rgbaColor = (0, _colorHexToRgb2.default)('#' + color.replace('#', ''));
      data.push({
        key: i,
        step: percentStep,
        color: rgbaColor,
        alpha: alpha,
        active: false
      });
      var parsedColor = 'rgba(' + rgbaColor.r + ', ' + rgbaColor.g + ', ' + rgbaColor.b + ', ' + alpha + ')';
      styleGradientPanel = styleGradientPanel + ', ' + parsedColor + ' ' + percentStep + '%';
      i += 1;
    });
  }
  return {
    gradient: styleGradientPanel + ')',
    data: data,
    max: max
  };
}

function decodeGradientProperties(colorsProperties, maxStep) {
  return Object.keys(colorsProperties).map(function (index) {
    var _colorsProperties$ind2 = colorsProperties[index],
        color = _colorsProperties$ind2.color,
        alpha = _colorsProperties$ind2.alpha,
        step = _colorsProperties$ind2.step;

    var rgbColor = (0, _colorRgbToHex2.default)(color);
    var item = colorsProperties[index];
    var stepValue = getPercentToStep(step, maxStep);
    return _extends({}, item, {
      step: stepValue,
      color: rgbColor,
      alpha: alpha
    });
  });
}

function sortCollectionGradient(data) {
  var sortedData = (0, _collection.sortBy)(data, function (o) {
    return o.step;
  });
  return sortedData.map(function (elem, index) {
    var resultElem = elem;
    resultElem.key = index;
    return elem;
  });
}