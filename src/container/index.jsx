import React from 'react';
import PropTypes from 'prop-types';
import injectSheet from 'react-jss'
import GradientPanel from '../components/gradient-panel';
import PointColor from '../components/point-color';
import AlphaColor from '../components/alpha-color';
import prepareGradientProperties, { sortCollectionGradient } from '../helpers/prepare-gradient-properties';
import pixelsToPercent from '../helpers/convert-coordinates';

const WIDTH_BUTTON = '30';
const styles = {
  container: {
    position: 'relative',
  },
  buttonsContainer: {
    position: 'relative',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    minHeight: '70px',
  }
};

class GradientPicker extends React.Component {
  constructor(props) {
    super(props);
    this.gradientProperies = prepareGradientProperties(props.gradient);
    this.styleGradientPanel = this.gradientProperies.gradient;
    this.state = {
      gradient: props.gradient,
      ...this.gradientProperies
    };
    
    this.pinColorChangeHandler = this.pinColorChangeHandler.bind(this);
    this.pixelsToPercent = pixelsToPercent.bind(this);
    this.activePinColor = this.activePinColor.bind(this);

  }

  getNewGradientPoint(data, posX, activeElement, activeState) {
    return data.map(elem => elem.key === activeElement.key
      ? { ...elem, step: posX, active: activeState }
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

  pinColorChangeHandler(signActive) {
    return (evt) => {
      const {state} = this;
      if (state.activeElement) {
        const activeElementSign = state.activeElement.active;
        const keyActiveElement = state.activeElement.key;
        if (activeElementSign && (keyActiveElement > 0)) {
          const posX = evt.pageX - (2 * WIDTH_BUTTON);
          const widthContainer = this.gradientContainer.clientWidth;
          const step = this.pixelsToPercent(posX, widthContainer);
          const {data} = state;
          const newData = this.getNewGradientPoint(data, step, state.activeElement, true);
          this.setState({
            ...state,
            data: sortCollectionGradient(newData),
            activeElement: {
              ...state.activeElement,
              step,
              active: signActive
            }
          });
        }
      }
    };
  }
  
  renderColorPoints(data) {
    this.colorsButtons = data.map(elem =>
      <PointColor
        key={`color-${elem.key}`}
        data={elem}
        activePinColor={this.activePinColor}
      />
    );
  }

  renderAlphaPoints(data) {
    this.alphaButtons = data.map(elem =>
      <AlphaColor key={`alpha-${elem.key}`} data={elem} />
    );
  }

  render() {
    const { props, state } = this;
    this.renderColorPoints(state.data);
    this.renderAlphaPoints(state.data);
    this.gradientProperies = prepareGradientProperties(props.gradient);
    this.styleGradientPanel = this.gradientProperies.gradient;
    return (
      <div
        className={props.classes.container}
        ref={(gradientContainer) => { this.gradientContainer = gradientContainer } }
        onMouseUp={this.pinColorChangeHandler(false)}
        onMouseMove={this.pinColorChangeHandler(true)}
        id="unique"
      >
        <div className={props.classes.buttonsContainer}>
          {this.colorsButtons}
        </div>
        <GradientPanel
          getGradientPanelWidth={this.getGradientPanelWidth}
          ref={(gradientPanel) => { this.gradientPanel = gradientPanel } }
          gradientStyle={this.styleGradientPanel}
        />
        {this.alphaButtons}
      </div>
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