"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = pixelsToPercent;
function pixelsToPercent(value, totalValue) {
  return Math.round(value * 100 / totalValue || 1);
}