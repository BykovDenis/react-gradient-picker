'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _styles = require('material-ui/styles');

var _Button = require('material-ui/Button');

var _Button2 = _interopRequireDefault(_Button);

var _Opacity = require('@material-ui/icons/Opacity');

var _Opacity2 = _interopRequireDefault(_Opacity);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var WIDTH_BUTTON = '30';
var HEIGHT_BUTTON = '30';
var styleSheet = function styleSheet(theme) {
  return {
    buttonContainer: {
      position: 'absolute',
      display: 'flex',
      transform: 'translateX(-' + (Math.floor(WIDTH_BUTTON / 2) - 1) + 'px)',
      flexDirection: 'column',
      justifyContent: 'center',
      whiteSpace: 'nowrap'
    },
    button: _extends({}, theme.muiTheme.button, {
      position: 'relative',
      zIndex: 5,
      padding: 0,
      width: WIDTH_BUTTON + 'px',
      minWidth: WIDTH_BUTTON + 'px',
      height: HEIGHT_BUTTON + 'px',
      backgroundSize: '40px 40px',
      backgroundRepeat: 'no-repeat',
      boxShadow: '0 2px 5px 0 rgba(26, 26, 27, .47)',
      borderRadius: '50%',
      cursor: 'pointer',
      outline: 'none',
      '&:focus': {
        filter: 'drop-shadow(0 0 2px rgba(0, 0, 0, .6))'
      },
      '&:focus + div': {
        filter: 'drop-shadow(0 0 2px rgba(0, 0, 0, .6))'
      }
    })
  };
};

function AlphaColor(props) {
  var positionX = props.data.step;
  return _react2.default.createElement(
    _react.Fragment,
    null,
    _react2.default.createElement(
      'div',
      { className: props.classes.buttonContainer, style: { left: positionX + '%' } },
      _react2.default.createElement(
        _Button2.default,
        {
          size: 'small',
          variant: 'fab',
          mini: true,
          'aria-label': 'alpha',
          className: props.classes.button
        },
        _react2.default.createElement(_Opacity2.default, null)
      )
    )
  );
}

AlphaColor.defaultProps = {
  data: {}
};

AlphaColor.propTypes = {
  data: _propTypes2.default.object.isRequired
};

exports.default = (0, _styles.withStyles)(styleSheet)(AlphaColor);