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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var styleSheet = function styleSheet(theme) {
  return {
    buttonContainer: {
      position: 'absolute',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      whiteSpace: 'nowrap'
    },
    title: {
      position: 'relative'
    },
    button: _extends({}, theme.muiTheme.button, {
      position: 'relative',
      zIndex: 3,
      padding: 0,
      margin: 0,
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
    }),
    line: {
      position: 'absolute',
      top: '100%',
      height: '25px',
      width: '1px',
      backgroundColor: 'rgba(0, 0, 0, .2)',
      zIndex: '2',
      boxShadow: '0 2px 5px 0 rgba(26, 26, 27, 0.47)'
    }
  };
};

function PointColor(props) {
  var positionX = props.data.step;

  var mouseDownHandler = function mouseDownHandler() {
    props.activePinColor(props.data);
  };

  return _react2.default.createElement(
    _react.Fragment,
    null,
    _react2.default.createElement(
      'div',
      {
        className: props.classes.buttonContainer,
        style: {
          left: positionX + '%',
          transform: 'translateX(-' + (Math.floor(props.widthPoint / 2) - 1) + 'px)'
        }
      },
      _react2.default.createElement(_Button2.default, {
        size: 'small',
        variant: 'fab',
        'aria-label': 'color',
        className: props.classes.button,
        onMouseDown: mouseDownHandler,
        style: {
          backgroundColor: props.isActive ? '#2babcf' : '#ed3e49',
          width: props.widthPoint + 'px',
          minWidth: props.widthPoint + 'px',
          minHeight: props.heightPoint + 'px',
          height: props.heightPoint + 'px'
        }
      })
    ),
    _react2.default.createElement('div', { className: props.classes.line, style: { left: positionX + '%' } })
  );
}

PointColor.defaultProps = {
  data: {},
  isActive: false,
  activePinColor: function activePinColor() {},
  widthPoint: 0,
  heightPoint: 0
};

PointColor.propTypes = {
  data: _propTypes2.default.object.isRequired,
  isActive: _propTypes2.default.bool.isRequired,
  activePinColor: _propTypes2.default.func.isRequired,
  widthPoint: _propTypes2.default.func.isRequired,
  heightPoint: _propTypes2.default.func.isRequired
};

exports.default = (0, _styles.withStyles)(styleSheet)(PointColor);