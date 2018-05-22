"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.convertAlphaHEXParameterToDec = convertAlphaHEXParameterToDec;
exports.convertAlphaDecParameterToHEX = convertAlphaDecParameterToHEX;
exports.convertColorDecParameterToHEX = convertColorDecParameterToHEX;
function convertAlphaHEXParameterToDec(alphaHEX) {
  return parseFloat((parseInt(alphaHEX, 16) / 255).toFixed(2), 10);
}

function convertAlphaDecParameterToHEX(alphaDEC) {
  return Math.ceil(alphaDEC * 25500 / 100).toString(16);
}

function convertColorDecParameterToHEX(alphaDEC) {
  return alphaDEC.toString(16);
}