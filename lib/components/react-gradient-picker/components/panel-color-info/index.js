'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _styles = require('material-ui/styles');

var _materialUi = require('material-ui');

var _Card = require('material-ui/Card');

var _Card2 = _interopRequireDefault(_Card);

var _reactColor = require('react-color');

var _reactColor2 = _interopRequireDefault(_reactColor);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var styles = function styles() {
  return {
    card: {
      display: 'flex',
      flexDirection: 'row',
      backgroundColor: 'white',
      borderRadius: 0,
      '&:hover': {
        backgroundColor: 'white !important'
      }
    },
    container: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-around',
      alignItem: 'center'
    },
    input: {
      width: '80px'
    },
    button: {
      color: '#ffffff',
      backgroundColor: '#ed3e49',
      '&:hover': {
        color: '#ffffff',
        backgroundColor: '#d82934'
      },
      '&:focus': {
        backgroundColor: '#d82934',
        borderColor: 'rgba(0,0,0,0.125)'
      },
      '&:active': {
        backgroundColor: '#d82934',
        borderColor: 'rgba(0,0,0,0.125)'
      }
    }
  };
};

var PanelColorInfo = function (_React$Component) {
  _inherits(PanelColorInfo, _React$Component);

  function PanelColorInfo(props) {
    _classCallCheck(this, PanelColorInfo);

    var _this = _possibleConstructorReturn(this, (PanelColorInfo.__proto__ || Object.getPrototypeOf(PanelColorInfo)).call(this, props));

    _this.colorSelectHandler = _this.colorSelectHandler.bind(_this);
    _this.stepChangeHandler = _this.stepChangeHandler.bind(_this);
    _this.gradientApplyHandler = _this.gradientApplyHandler.bind(_this);
    _this.resetButtonClickHandler = _this.resetButtonClickHandler.bind(_this);
    return _this;
  }

  _createClass(PanelColorInfo, [{
    key: 'colorSelectHandler',
    value: function colorSelectHandler(color) {
      var _props$activeElement = this.props.activeElement,
          key = _props$activeElement.key,
          step = _props$activeElement.step;

      var rgb = { r: color.rgb.r, g: color.rgb.g, b: color.rgb.b };
      var alpha = color.rgb.a;
      this.props.changeColorActiveElement(key, rgb, alpha, step);
    }
  }, {
    key: 'stepChangeHandler',
    value: function stepChangeHandler(evt) {
      var props = this.props;

      var target = evt.target;
      var _props = this.props,
          activeElement = _props.activeElement,
          countPoints = _props.countPoints;

      var value = parseInt(evt.target.value, 10);
      if (activeElement.key > 0 && activeElement.key < countPoints) {
        if (value < 0) {
          value = 0;
          target.value = 0;
        }
        if (value > 100) {
          value = 100;
          target.value = 100;
        }
        this.props.getNewStepPoint(props.activeElement.key, value);
      }
    }
  }, {
    key: 'gradientApplyHandler',
    value: function gradientApplyHandler() {
      this.props.applyPickerGradientParams();
    }
  }, {
    key: 'resetButtonClickHandler',
    value: function resetButtonClickHandler() {
      this.props.resetPalette();
    }
  }, {
    key: 'render',
    value: function render() {
      var props = this.props;

      var activeElement = this.props.activeElement;
      var color = activeElement.color,
          alpha = activeElement.alpha,
          id = activeElement.id,
          step = activeElement.step;

      var colorRGBA = 'rgba(' + color.r + ', ' + color.g + ', ' + color.b + ', ' + alpha + ')';
      return _react2.default.createElement(
        _Card2.default,
        { className: props.classes.card },
        _react2.default.createElement(_reactColor2.default, {
          color: colorRGBA,
          onChangeComplete: this.colorSelectHandler,
          className: props.classes.picker
        }),
        _react2.default.createElement(
          'div',
          { className: props.classes.container },
          _react2.default.createElement(_materialUi.TextField, {
            id: '' + id + Math.random() + 'point-position',
            name: 'point-position',
            label: 'Position',
            type: 'number',
            value: step,
            className: props.classes.input,
            onChange: this.stepChangeHandler
          }),
          _react2.default.createElement(
            _materialUi.Button,
            {
              name: 'resetPalette',
              raised: 'true',
              className: props.classes.button,
              onClick: this.resetButtonClickHandler
            },
            'Reset'
          ),
          _react2.default.createElement(
            _materialUi.Button,
            {
              name: 'applyPalette',
              raised: 'true',
              className: props.classes.button,
              onClick: this.gradientApplyHandler
            },
            'Apply'
          )
        )
      );
    }
  }]);

  return PanelColorInfo;
}(_react2.default.Component);

PanelColorInfo.defaultProps = {
  activeElement: {
    key: 1,
    step: 10,
    alpha: 1,
    color: {
      b: 0,
      g: 0,
      r: 0
    }
  },
  countPoints: 0,
  changeColorActiveElement: function changeColorActiveElement() {},
  applyPickerGradientParams: function applyPickerGradientParams() {},
  getNewStepPoint: function getNewStepPoint() {},
  resetPalette: function resetPalette() {}
};

PanelColorInfo.propTypes = {
  activeElement: _propTypes2.default.object.isRequired,
  countPoints: _propTypes2.default.number.isRequired,
  changeColorActiveElement: _propTypes2.default.func.isRequired,
  applyPickerGradientParams: _propTypes2.default.func.isRequired,
  getNewStepPoint: _propTypes2.default.func.isRequired,
  resetPalette: _propTypes2.default.func.isRequired
};

exports.default = (0, _styles.withStyles)(styles)(PanelColorInfo);