"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.convertStepToPercent = convertStepToPercent;
exports.convertStepsToPercents = convertStepsToPercents;
exports.convertPercentsToStep = convertPercentsToStep;
exports.getStepPosition = getStepPosition;
function convertStepToPercent(value, max) {
  return value * 100 / max;
}

function convertStepsToPercents(data, max) {
  return data.map(function (elem) {
    return convertStepToPercent(elem, max);
  });
}

function convertPercentsToStep(data, max) {
  return data.map(function (elem) {
    return max * elem / 100;
  });
}

function getStepPosition(posX, widthContainer) {
  return (posX / widthContainer).toFixed(2);
}