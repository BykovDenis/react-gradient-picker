'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _styles = require('material-ui/styles');

var _Card = require('material-ui/Card');

var _Card2 = _interopRequireDefault(_Card);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var styles = function styles() {
  return {
    container: {
      width: '100%',
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      textAlign: 'center'
    }
  };
};

function GradientPanel(props) {
  return _react2.default.createElement(
    _react.Fragment,
    null,
    _react2.default.createElement(_Card2.default, {
      className: props.classes.container,
      style: { backgroundImage: props.gradientStyle, height: props.heightGradientPanel + 'px' }
    })
  );
}

GradientPanel.defaultProps = {
  gradientStyle: '',
  heightGradientPanel: 0
};

GradientPanel.propTypes = {
  gradientStyle: _propTypes2.default.string.isRequired,
  heightGradientPanel: _propTypes2.default.number.isRequired
};

exports.default = (0, _styles.withStyles)(styles)(GradientPanel);