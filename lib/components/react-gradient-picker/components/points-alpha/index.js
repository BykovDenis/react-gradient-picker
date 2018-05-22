'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _index = require('../alpha-color/index');

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function PointsAlpha(props) {
  var activeElementKey = props.activeElementKey;

  var alphaButtons = props.data.map(function (elem) {
    return _react2.default.createElement(_index2.default, { key: 'alpha-' + elem.key, data: elem, isActive: activeElementKey === elem.key });
  });
  return _react2.default.createElement(
    _react.Fragment,
    null,
    alphaButtons
  );
}

PointsAlpha.defaultProps = {
  data: [],
  activeElementKey: 0
};

PointsAlpha.propTypes = {
  data: _propTypes2.default.array.isRequired,
  activeElementKey: _propTypes2.default.number.isRequired
};

exports.default = PointsAlpha;