import React from 'react';
import PropTypes from 'prop-types';
import injectSheet from 'react-jss';
import { TextField } from 'material-ui';
import Card from '@material-ui/core/Card';
import SketchPicker from 'react-color';

const styles = {
  card: {
    display: 'inline-block',
    verticalAlign: 'baseline',
    backgroundColor: 'white',
    borderRadius: 0,
    minWidth: '240px',
    minHeight: '300px',
  },
  container: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around'
  },
  input: {
    width: '80px',
  }
};

class PanelColorInfo extends React.Component {
  constructor(props) {
    super(props);
    this.colorSelectHandler = this.colorSelectHandler.bind(this);
    this.stepChangeHandler = this.stepChangeHandler.bind(this);
  }

  colorSelectHandler(color) {
    const { props } = this;
    const rgb = { r: color.rgb.r, g: color.rgb.g, b: color.rgb.b };
    const alpha = color.rgb.a;
    const key = props.activeElement.key;
    const step = props.activeElement.step;
    props.changeColorActiveElement(key, rgb, alpha, step);
  }

  stepChangeHandler(evt) {
    const { props } = this;
    let value = parseInt(evt.target.value, 10);
    if (props.activeElement.key > 0 && props.activeElement.key < props.countPoints) {
      if (value < 0) {
        value = 0;
        evt.target.value = 0;
      }
      if (value > 100) {
        value = 100;
        evt.target.value = 100;
      }
      props.getNewStepPoint(props.activeElement.key, value);
    }
  }

  render() {
    const { props } = this;
    const {color, alpha} = props.activeElement;
    const colorRGBA = `rgba(${color.r}, ${color.g}, ${color.b}, ${alpha})`;
    return (
      <Card className={props.classes.card}>
        <form method="GET" name="color-parameters" className={props.classes.container}>
          {this.textField}
          <SketchPicker
            color={colorRGBA}
            onChangeComplete={this.colorSelectHandler}
          />
        </form>
        <TextField
          id={`${props.activeElement.id}${Math.random()}point-position`}
          name="point-position"
          label="Position"
          type='number'
          value={props.activeElement.step}
          className={props.classes.input}
          onChange={this.stepChangeHandler}
        />
      </Card>
    );
  }
}

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
  changeColorActiveElement: () => {},
  getNewStepPoint: () => {},
};

PanelColorInfo.propTypes = {
  activeElement: PropTypes.object.isRequired,
  countPoints: PropTypes.number.isRequired,
  changeColorActiveElement: PropTypes.func.isRequired,
  getNewStepPoint: PropTypes.func.isRequired
};

export default injectSheet(styles)(PanelColorInfo);