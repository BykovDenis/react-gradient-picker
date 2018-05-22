'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _index = require('../point-color/index');

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function PointsColor(props) {
  var activePinColor = props.activePinColor;
  var colorsButtons = props.data.map(function (elem) {
    return _react2.default.createElement(_index2.default, {
      key: 'color-' + elem.key,
      data: elem,
      activePinColor: activePinColor,
      isActive: props.activeElementKey === elem.key
    });
  });
  return _react2.default.createElement(
    _react.Fragment,
    null,
    colorsButtons
  );
}

PointsColor.defauldtProps = {
  data: [],
  styleGradientPanel: '',
  activePinColor: function activePinColor() {},
  activeElementKey: 0
};

PointsColor.propTypes = {
  data: _propTypes2.default.array.isRequired,
  activePinColor: _propTypes2.default.func.isRequired,
  activeElementKey: _propTypes2.default.number.isRequired
};

exports.default = PointsColor;