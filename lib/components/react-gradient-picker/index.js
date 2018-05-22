'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _styles = require('material-ui/styles');

var _MuiThemeProvider = require('material-ui/styles/MuiThemeProvider');

var _MuiThemeProvider2 = _interopRequireDefault(_MuiThemeProvider);

var _createMuiTheme = require('material-ui/styles/createMuiTheme');

var _createMuiTheme2 = _interopRequireDefault(_createMuiTheme);

var _materialUi = require('material-ui');

var _index = require('./components/gradient-panel/index');

var _index2 = _interopRequireDefault(_index);

var _index3 = require('./components/panel-color-info/index');

var _index4 = _interopRequireDefault(_index3);

var _index5 = require('./components/points-color/index');

var _index6 = _interopRequireDefault(_index5);

var _prepareGradientProperties = require('./helpers/prepare-gradient-properties');

var _convertCoordinates = require('./helpers/convert-coordinates');

var _convertCoordinates2 = _interopRequireDefault(_convertCoordinates);

var _muiTheme = require('./mui-theme');

var _muiTheme2 = _interopRequireDefault(_muiTheme);

var _convertSteps = require('./helpers/convert-steps');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var styles = function styles() {
  return {
    container: {
      position: 'relative',
      marginBottom: '10px',
      marginLeft: '10px',
      marginRight: '10px'
    },
    buttonsContainer: {
      position: 'relative',
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'flex-start',
      minHeight: '15px',
      '&:hover': {
        cursor: 'copy'
      }
    }
  };
};

var theme = (0, _createMuiTheme2.default)({ muiTheme: _muiTheme2.default });

var Index = function (_React$Component) {
  _inherits(Index, _React$Component);

  function Index(props) {
    _classCallCheck(this, Index);

    var _this = _possibleConstructorReturn(this, (Index.__proto__ || Object.getPrototypeOf(Index)).call(this, props));

    _this.gradientProperies = (0, _prepareGradientProperties.encodeGradientProperties)(props.gradient);
    _this.styleGradientPanel = _this.gradientProperies.gradient;
    var defaultElement = _this.gradientProperies.data[1];
    _this.state = _extends({}, _this.gradientProperies, {
      gradientOriginal: props.gradient,
      exportData: props.gradient,
      activeElement: defaultElement,
      max: _this.gradientProperies.max
    });
    _this.pinColorChangeHandler = _this.pinColorChangeHandler.bind(_this);
    _this.pixelsToPercent = _convertCoordinates2.default.bind(_this);
    _this.activePinColor = _this.activePinColor.bind(_this);
    _this.changeColorActiveElement = _this.changeColorActiveElement.bind(_this);
    _this.getNewStepPoint = _this.getNewStepPoint.bind(_this);
    _this.resetPalette = _this.resetPalette.bind(_this);
    _this.pointAddHandler = _this.pointAddHandler.bind(_this);
    return _this;
  }

  _createClass(Index, [{
    key: 'getPosX',
    value: function getPosX(posX) {
      var clientRect = this.gradientContainer.getBoundingClientRect();
      debugger;
      return posX - clientRect.left;
    }
  }, {
    key: 'getNewGradientPoint',
    value: function getNewGradientPoint(data, posX, activeElement, activeState) {
      return data.map(function (elem) {
        if (elem.key === activeElement.key) {
          return _extends({}, elem, {
            step: posX,
            color: activeElement.color,
            alpha: activeElement.alpha,
            active: activeState
          });
        }
        return elem;
      });
    }
  }, {
    key: 'getNewStepPoint',
    value: function getNewStepPoint(key, step) {
      var state = this.state;

      var newData = state.data.map(function (elem) {
        if (elem.key === key) {
          return _extends({}, elem, {
            step: step
          });
        }
        return elem;
      });
      var activeElement = _extends({}, state.activeElement, {
        step: step
      });
      this.updatePointsColor(activeElement, step, newData);
      this.setState(_extends({}, this.state, {
        data: newData,
        activeElement: activeElement
      }));
    }
  }, {
    key: 'activePinColor',
    value: function activePinColor(params) {
      var data = this.state.data;

      var newData = data.map(function (elem) {
        if (elem.key === params.key) {
          return _extends({}, elem, {
            active: true
          });
        }
        return elem;
      });
      this.setState(_extends({}, this.state, {
        data: newData,
        activeElement: {
          key: params.key,
          step: params.step,
          color: params.color,
          alpha: params.alpha,
          active: true
        }
      }));
    }
  }, {
    key: 'updatePointsColor',
    value: function updatePointsColor(activeElement, step) {
      var newDataCustom = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
      var state = this.state;

      var newData = void 0;
      if (!newDataCustom) {
        newData = this.getNewGradientPoint(state.data, step, activeElement, true);
      } else {
        newData = newDataCustom;
      }
      var exportData = (0, _prepareGradientProperties.decodeGradientProperties)(newData, state.max);
      this.gradientProperies = (0, _prepareGradientProperties.encodeGradientProperties)(exportData);
      var gradient = this.gradientProperies.gradient;

      this.styleGradientPanel = gradient;
      return { newData: newData, exportData: exportData };
    }
  }, {
    key: 'changeColorActiveElement',
    value: function changeColorActiveElement(key, color, alpha, step) {
      var activeElement = {
        key: key,
        step: step,
        color: color,
        alpha: alpha
      };
      var state = this.state;

      var updatedData = this.updatePointsColor(activeElement, step);
      var exportData = updatedData.exportData,
          steps = updatedData.steps;

      this.setState(_extends({}, state, this.gradientProperies, {
        exportData: exportData,
        steps: steps,
        data: (0, _prepareGradientProperties.sortCollectionGradient)(updatedData.newData),
        activeElement: activeElement
      }));
    }
  }, {
    key: 'resetPalette',
    value: function resetPalette() {
      var props = this.props,
          state = this.state;

      this.gradientProperies = (0, _prepareGradientProperties.encodeGradientProperties)(state.gradientOriginal);
      this.styleGradientPanel = this.gradientProperies.gradient;
      var defaultElement = this.gradientProperies.data[1];
      this.setState(_extends({}, this.gradientProperies, {
        exportData: props.gradient,
        activeElement: defaultElement,
        max: this.gradientProperies.max
      }));
    }
  }, {
    key: 'pinColorChangeHandler',
    value: function pinColorChangeHandler(signActive) {
      var _this2 = this;

      return function (evt) {
        var state = _this2.state;

        if (state.activeElement) {
          var activeElement = state.activeElement;
          var activeElementSign = activeElement.active;
          var keyActiveElement = activeElement.key;
          if (activeElementSign && keyActiveElement > 0 && keyActiveElement < state.data.length - 1) {
            var posX = _this2.getPosX(evt.clientX);
            var widthContainer = _this2.gradientContainer.clientWidth;
            var step = _this2.pixelsToPercent(posX, widthContainer);
            var updatedData = _this2.updatePointsColor(activeElement, step);
            _this2.setState(_extends({}, state, _this2.gradientProperies, {
              data: (0, _prepareGradientProperties.sortCollectionGradient)(updatedData.newData),
              activeElement: _extends({}, activeElement, {
                step: step,
                active: signActive
              }),
              exportData: updatedData.exportData
            }));
          }
        }
      };
    }
  }, {
    key: 'pointAddHandler',
    value: function pointAddHandler(evt) {
      var target = evt.target;
      if (target.tagName !== 'BUTTON') {
        var data = this.state.data;
        var lastElement = data[data.length - 1];
        var newElement = _extends({}, lastElement);
        var posX = this.getPosX(evt.clientX);
        var step = (0, _convertSteps.getStepPosition)(posX, this.gradientContainer.offsetWidth);
        var stepPercent = step * 100;
        newElement.step = stepPercent;
        newElement.key += 1;
        var newData = (0, _prepareGradientProperties.sortCollectionGradient)([].concat(_toConsumableArray(data), [newElement]));
        var updatedData = this.updatePointsColor(newElement, stepPercent, newData);
        this.setState(_extends({}, this.state, {
          data: updatedData.newData,
          exportData: updatedData.exportData,
          activeElement: newElement
        }));
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _this3 = this;

      var props = this.props,
          state = this.state;

      return _react2.default.createElement(
        _MuiThemeProvider2.default,
        { theme: theme },
        _react2.default.createElement(
          'div',
          {
            className: props.classes.container,
            ref: function ref(gradientContainer) {
              return _this3.gradientContainer = gradientContainer;
            },
            onMouseUp: this.pinColorChangeHandler(false),
            onMouseMove: this.pinColorChangeHandler(true),
            id: 'unique'
          },
          _react2.default.createElement(
            'div',
            {
              className: props.classes.buttonsContainer,
              onClick: this.pointAddHandler
            },
            _react2.default.createElement(_index6.default, {
              data: state.data,
              activePinColor: this.activePinColor,
              activeElementKey: state.activeElement.key
            })
          ),
          _react2.default.createElement(_index2.default, {
            getGradientPanelWidth: this.getGradientPalonelWidth,
            ref: function ref(gradientPanel) {
              return _this3.gradientPanel = gradientPanel;
            },
            gradientStyle: this.styleGradientPanel
          })
        ),
        _react2.default.createElement(_index4.default, {
          changeColorActiveElement: this.changeColorActiveElement,
          activeElement: state.activeElement,
          getNewStepPoint: this.getNewStepPoint,
          countPoints: state.data.length,
          resetPalette: this.resetPalette
        }),
        _react2.default.createElement(
          _materialUi.Card,
          null,
          this.styleGradientPanel
        )
      );
    }
  }]);

  return Index;
}(_react2.default.Component);

Index.defaultProps = {
  gradient: [{ step: "0", color: "ffffe5", alpha: "ff" }, { step: "0.1", color: "f7fcb9", alpha: "ff" }, { step: "0.2", color: "d9f0a3", alpha: "ff" }, { step: "0.3", color: "addd8e", alpha: "ff" }, { step: "0.4", color: "78c679", alpha: "ff" }, { step: "0.5", color: "41ab5d", alpha: "ff" }, { step: "0.6", color: "238443", alpha: "ff" }, { step: "0.7", color: "006837", alpha: "ff" }, { step: "1", color: "004529", alpha: "ff" }]
};

Index.propTypes = {
  gradient: _propTypes2.default.array.isRequired
};

exports.default = (0, _styles.withStyles)(styles)(Index);