import React from 'react';
import PropTypes from 'prop-types';
import injectSheet from 'react-jss';
import { TextField } from 'material-ui';
import Card from '@material-ui/core/Card';
import SketchPicker from 'react-color';

const styles = {
  card: {
    display: 'inline-block',
    vertcalAlign: 'baseline',
    paddingTop: '10px',
    paddingBottom: '10px',
    paddingLeft: '10px',
    paddingRight: '10px',
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

function PanelColorInfo(props) {
  // const colorRGBA = { ...props.color, a: props.activeElement.alpha };
  const { color, alpha } = props.activeElement;
  const colorRGBA = `rgba(${color.r}, ${color.g}, ${color.b}, ${alpha})`;
  stepChangeHandler = stepChangeHandler.bind(this);

  function colorSelectHandler(color) {
    const rgb = { r: color.rgb.r, g: color.rgb.g, b: color.rgb.b };
    const alpha = color.rgb.a;
    const key = props.activeElement.key;
    const step = props.activeElement.step; 
    props.changeColorActiveElement(key, rgb, alpha, step);
  }

  function stepChangeHandler(evt) {
    props.getNewStepPoint(props.activeElement.key, evt.target.value);
  }

  return (
    <Card className={props.classes.card}>
      <form method="GET" name="color-parameters" className={props.classes.container}>
        <TextField
          id={`${props.activeElement.id}${Math.random()}point-position`}
          name="point-position"
          label="Position"
          type='number'
          defaultValue={props.activeElement.step}
          className={props.classes.input}
          onChange={stepChangeHandler}
        />
        <SketchPicker
          color={colorRGBA}
          onChangeComplete={colorSelectHandler}
        />
      </form>
    </Card>
  );
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
  changeColorActiveElement: () => {},
  getNewStepPoint: () => {},
};

PanelColorInfo.propTypes = {
  activeElement: PropTypes.object.isRequired,
  changeColorActiveElement: PropTypes.func.isRequired,
  getNewStepPoint: PropTypes.func.isRequired
};

export default injectSheet(styles)(PanelColorInfo);