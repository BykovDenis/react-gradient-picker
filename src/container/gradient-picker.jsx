import React from 'react';
import PropTypes from 'prop-types';
import injectSheet from 'react-jss'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import createMuiTheme from 'material-ui/styles/createMuiTheme';
import GradientPanel from '../components/gradient-panel';
import PanelColorInfo from '../components/panel-info-color';
import PointsColor from '../components/points-color';
import {
  encodeGradientProperties,
  decodeGradientProperties,
  sortCollectionGradient
}
from '../helpers/prepare-gradient-properties';
import pixelsToPercent from '../helpers/convert-coordinates';
import muiTheme from './mui-theme';

const WIDTH_BUTTON = '15';
const styles = {
  container: {
    position: 'relative',
    marginBottom: '60px',
  },
  buttonsContainer: {
    position: 'relative',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    minHeight: '15px',
  }
};

const theme = createMuiTheme({ muiTheme });

class GradientPicker extends React.Component {
  constructor(props) {
    super(props);
    this.gradientProperies = encodeGradientProperties(props.gradient);
    this.styleGradientPanel = this.gradientProperies.gradient;
    const defaultElement = this.gradientProperies.data[1];
    this.state = {
      ...this.gradientProperies,
      exportData: props.gradient,
      activeElement: defaultElement
    };
    this.pinColorChangeHandler = this.pinColorChangeHandler.bind(this);
    this.pixelsToPercent = pixelsToPercent.bind(this);
    this.activePinColor = this.activePinColor.bind(this);
    this.changeColorActiveElement = this.changeColorActiveElement.bind(this);
    this.getNewStepPoint = this.getNewStepPoint.bind(this);
  }

  getNewGradientPoint(data, posX, activeElement, activeState) {
    return data.map(elem => elem.key === activeElement.key
      ? {
        ...elem,
        step: posX,
        color: activeElement.color,
        alpha: activeElement.alpha,
        active: activeState
      }
      : elem
    );
  }

  activePinColor(params) {
    const { data } = this.state;
    const newData = data.map(elem => elem.key === params.key ? { ...elem, active: true} : elem);
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
    const exportData = decodeGradientProperties(newData);
    this.gradientProperies = encodeGradientProperties(exportData);
    this.styleGradientPanel = this.gradientProperies.gradient;
    return { newData: newData, exportData: exportData };
  }

  getNewStepPoint(key, step) {
    const { state } = this;
    const newData = state.data.map(elem => elem.key === key
      ? {
        ...elem,
        step,
      }
      : elem
    );
    const activeElement = {
      ...state.activeElement,
      step,
    };
    this.updatePointsColor(activeElement, step, newData)
    this.setState({
      ...this.state,
      data: newData,
      activeElement,
    })
  }

  changeColorActiveElement(key, color, alpha, step) {
    const activeElement = {
      key: key,
      step: step,
      color: color,
      alpha: alpha,
    };
    const { state } = this;
    const updatedData = this.updatePointsColor(activeElement, step);
    this.setState({
      ...state,
      ...this.gradientProperies,
      exportData: updatedData.exportData,
      data: sortCollectionGradient(updatedData.newData),
      activeElement
    });
  }

  pinColorChangeHandler(signActive) {
    return (evt) => {
      const {state} = this;
      if (state.activeElement) {
        const activeElement = state.activeElement;
        const activeElementSign = activeElement.active;
        const keyActiveElement = activeElement.key;
        if (activeElementSign && keyActiveElement > 0 && keyActiveElement < state.data.length - 1 ) {
          const posX = evt.pageX - (3 * WIDTH_BUTTON);
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
              exportData: updatedData.exportData,
              active: signActive
            }
          });
        }
      }
    };
  }

  render() {
    const { props, state } = this;
    return (
      <MuiThemeProvider theme={theme}>
        <div
          className={props.classes.container}
          ref={(gradientContainer) => { this.gradientContainer = gradientContainer } }
          onMouseUp={this.pinColorChangeHandler(false)}
          onMouseMove={this.pinColorChangeHandler(true)}
          id="unique"
        >
          <div className={props.classes.buttonsContainer}>
            <PointsColor
              data={state.data}
              activePinColor={this.activePinColor}
              activeElementKey={state.activeElement.key}
            />
          </div>
          <GradientPanel
            getGradientPanelWidth={this.getGradientPanelWidth}
            ref={(gradientPanel) => { this.gradientPanel = gradientPanel } }
            gradientStyle={this.styleGradientPanel}
          />
        </div>
        <PanelColorInfo
          changeColorActiveElement={this.changeColorActiveElement}
          activeElement={state.activeElement}
          getNewStepPoint={this.getNewStepPoint}
          countPoints={state.data.length}
        />
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
  ]
};

GradientPicker.propTypes = {
  gradient: PropTypes.array.isRequired
};

export default injectSheet(styles)(GradientPicker);