import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import createMuiTheme from 'material-ui/styles/createMuiTheme';
import { Card } from 'material-ui';
import GradientPanel from '../components/gradient-panel';
import PanelColorInfo from '../components/panel-color-info';
import PointsColor from '../components/points-color';
import {
  encodeGradientProperties,
  decodeGradientProperties,
  sortCollectionGradient
}
from '../helpers/prepare-gradient-properties';
import pixelsToPercent from '../helpers/convert-coordinates';
import muiTheme from './mui-theme';
import { getStepPosition } from '../helpers/convert-steps';

const WIDTH_BUTTON = '15';
const styles = () => ({
  container: {
    position: 'relative',
    marginBottom: '10px',
    marginLeft: '10px',
    marginRight: '10px',
  },
  buttonsContainer: {
    position: 'relative',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    minHeight: '15px',
    '&:hover': {
      cursor: 'copy',
    }
  }
});

const theme = createMuiTheme({ muiTheme });

class GradientPicker extends React.Component {
  constructor(props) {
    super(props);
    this.gradientProperies = encodeGradientProperties(props.gradient);
    this.styleGradientPanel = this.gradientProperies.gradient;
    const defaultElement = this.gradientProperies.data[1];
    this.state = {
      ...this.gradientProperies,
      gradientOriginal: props.gradient,
      exportData: props.gradient,
      activeElement: defaultElement,
      max: this.gradientProperies.max,
    };
    this.pinColorChangeHandler = this.pinColorChangeHandler.bind(this);
    this.pixelsToPercent = pixelsToPercent.bind(this);
    this.activePinColor = this.activePinColor.bind(this);
    this.changeColorActiveElement = this.changeColorActiveElement.bind(this);
    this.getNewStepPoint = this.getNewStepPoint.bind(this);
    this.resetPalette = this.resetPalette.bind(this);
    this.pointAddHandler = this.pointAddHandler.bind(this);
  }

  getPosX(posX) {
    const clientRect = this.gradientContainer.getBoundingClientRect();
    debugger;
    return (posX - clientRect.left);
  }

  getNewGradientPoint(data, posX, activeElement, activeState) {
    return data.map((elem) => {
      if (elem.key === activeElement.key) {
        return {
          ...elem,
          step: posX,
          color: activeElement.color,
          alpha: activeElement.alpha,
          active: activeState
        };
      }
      return elem;
    });
  }

  getNewStepPoint(key, step) {
    const { state } = this;
    const newData = state.data.map((elem) => {
      if (elem.key === key) {
        return {
          ...elem,
          step,
        };
      }
      return elem;
    });
    const activeElement = {
      ...state.activeElement,
      step,
    };
    this.updatePointsColor(activeElement, step, newData);
    this.setState({
      ...this.state,
      data: newData,
      activeElement,
    });
  }

  activePinColor(params) {
    const { data } = this.state;
    const newData = data.map((elem) => {
      if (elem.key === params.key) {
        return {
          ...elem,
          active: true
        };
      }
      return elem;
    });
    this.setState({
      ...this.state,
      data: newData,
      activeElement: {
        key: params.key,
        step: params.step,
        color: params.color,
        alpha: params.alpha,
        active: true,
      }
    });
  }

  updatePointsColor(activeElement, step, newDataCustom = false) {
    const { state } = this;
    let newData;
    if (!newDataCustom) {
      newData = this.getNewGradientPoint(state.data, step, activeElement, true);
    } else {
      newData = newDataCustom;
    }
    const exportData = decodeGradientProperties(newData, state.max);
    this.gradientProperies = encodeGradientProperties(exportData);
    const { gradient } = this.gradientProperies;
    this.styleGradientPanel = gradient;
    return { newData, exportData };
  }


  changeColorActiveElement(key, color, alpha, step) {
    const activeElement = {
      key,
      step,
      color,
      alpha,
    };
    const { state } = this;
    const updatedData = this.updatePointsColor(activeElement, step);
    const { exportData, steps } = updatedData;
    this.setState({
      ...state,
      ...this.gradientProperies,
      exportData,
      steps,
      data: sortCollectionGradient(updatedData.newData),
      activeElement
    });
  }

  resetPalette() {
    const { props, state } = this;
    this.gradientProperies = encodeGradientProperties(state.gradientOriginal);
    this.styleGradientPanel = this.gradientProperies.gradient;
    const defaultElement = this.gradientProperies.data[1];
    this.setState({
      ...this.gradientProperies,
      exportData: props.gradient,
      activeElement: defaultElement,
      max: this.gradientProperies.max,
    });
  }

  pinColorChangeHandler(signActive) {
    return (evt) => {
      const { state } = this;
      if (state.activeElement) {
        const activeElement = state.activeElement;
        const activeElementSign = activeElement.active;
        const keyActiveElement = activeElement.key;
        if (activeElementSign && keyActiveElement > 0 && keyActiveElement < state.data.length - 1) {
          const posX = this.getPosX(evt.clientX);
          const widthContainer = this.gradientContainer.clientWidth;
          const step = this.pixelsToPercent(posX, widthContainer);
          const updatedData = this.updatePointsColor(activeElement, step);
          this.setState({
            ...state,
            ...this.gradientProperies,
            data: sortCollectionGradient(updatedData.newData),
            activeElement: {
              ...activeElement,
              step,
              active: signActive
            },
            exportData: updatedData.exportData,
          });
        }
      }
    };
  }

  pointAddHandler(evt) {
    const target = evt.target;
    if (target.tagName !== 'BUTTON') {
      const data = this.state.data;
      const lastElement = data[data.length - 1];
      const newElement = {
        ...lastElement
      };
      const posX = this.getPosX(evt.clientX);
      const step = getStepPosition(posX, this.gradientContainer.offsetWidth);
      const stepPercent = step * 100;
      newElement.step = stepPercent;
      newElement.key += 1;
      const newData = sortCollectionGradient([...data, newElement]);
      const updatedData = this.updatePointsColor(newElement, stepPercent, newData);
      this.setState({
        ...this.state,
        data: updatedData.newData,
        exportData: updatedData.exportData,
        activeElement: newElement,
      });
    }
  }

  render() {
    const { props, state } = this;
    return (
      <MuiThemeProvider theme={theme}>
        <div
          className={props.classes.container}
          ref={gradientContainer => this.gradientContainer = gradientContainer}
          onMouseUp={this.pinColorChangeHandler(false)}
          onMouseMove={this.pinColorChangeHandler(true)}
          id="unique"
        >
          <div
            className={props.classes.buttonsContainer}
            onClick={this.pointAddHandler}
          >
            <PointsColor
              data={state.data}
              activePinColor={this.activePinColor}
              activeElementKey={state.activeElement.key}
            />
          </div>
          <GradientPanel
            getGradientPanelWidth={this.getGradientPalonelWidth}
            ref={gradientPanel => this.gradientPanel = gradientPanel}
            gradientStyle={this.styleGradientPanel}
          />
        </div>
        <PanelColorInfo
          changeColorActiveElement={this.changeColorActiveElement}
          activeElement={state.activeElement}
          getNewStepPoint={this.getNewStepPoint}
          countPoints={state.data.length}
          resetPalette={this.resetPalette}
        />
        <Card>
          {this.styleGradientPanel}
        </Card>
      </MuiThemeProvider>
    );
  }
}

GradientPicker.defaultProps = {
  gradient: [
    {step: "0", color: "ffffe5", alpha: "ff"},
    {step: "0.1", color: "f7fcb9", alpha: "ff"},
    {step: "0.2", color: "d9f0a3", alpha: "ff"},
    {step: "0.3", color: "addd8e", alpha: "ff"},
    {step: "0.4", color: "78c679", alpha: "ff"},
    {step: "0.5", color: "41ab5d", alpha: "ff"},
    {step: "0.6", color: "238443", alpha: "ff"},
    {step: "0.7", color: "006837", alpha: "ff"},
    {step: "1", color: "004529", alpha: "ff"}
  ],
};

GradientPicker.propTypes = {
  gradient: PropTypes.array.isRequired
};

export default withStyles(styles)(GradientPicker);