import React, {Fragment} from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Button from 'material-ui/Button';

const WIDTH_BUTTON = '15';
const HEIGHT_BUTTON = '15';
const styleSheet = (theme) => {
  return {
    buttonContainer: {
      position: 'absolute',
      display: 'flex',
      transform: `translateX(-${Math.floor(WIDTH_BUTTON / 2) - 1}px)`,
      flexDirection: 'column',
      justifyContent: 'center',
      whiteSpace: 'nowrap'
    },
    title: {
      position: 'relative',
    },
    button: {
      ...theme.muiTheme.button,
      position: 'relative',
      zIndex: 3,
      padding: 0,
      margin: 0,
      width: `${WIDTH_BUTTON}px`,
      minWidth: `${WIDTH_BUTTON}px`,
      minHeight: `${HEIGHT_BUTTON}px`,
      height: `${HEIGHT_BUTTON}px`,
      backgroundSize: '40px 40px',
      backgroundRepeat: 'no-repeat',
      boxShadow: '0 2px 5px 0 rgba(26, 26, 27, .47)',
      borderRadius: '50%',
      cursor: 'pointer',
      outline: 'none',
      '&:focus': {
        filter: 'drop-shadow(0 0 2px rgba(0, 0, 0, .6))',
      },
      '&:focus + div': {
        filter: 'drop-shadow(0 0 2px rgba(0, 0, 0, .6))',
      }
    },
    line: {
      position: 'absolute',
      top: '100%',
      height: '25px',
      width: '1px',
      backgroundColor: 'rgba(0, 0, 0, .2)',
      zIndex: '2',
      boxShadow: '0 2px 5px 0 rgba(26, 26, 27, 0.47)',
    }
  }
};

function PointColor(props) {
  const positionX = props.data.step;

  const mouseDownHandler = () => {
    props.activePinColor(props.data);
  };

  return (
    <Fragment>
      <div className={props.classes.buttonContainer} style={{ left: `${positionX}%`}}>
        <Button
          size="small"
          variant="fab"
          aria-label="color"
          className={props.classes.button}
          onMouseDown={mouseDownHandler}
          style={{ backgroundColor: props.isActive ? '#2babcf' : '#ed3e49' }}
        />
      </div>
      <div className={props.classes.line} style={{ left: `${positionX}%`}} />
    </Fragment>
  );
}

PointColor.defaultProps = {
  data: {},
  isActive: false,
  activePinColor: () => {},
};

PointColor.propTypes = {
  data: PropTypes.object.isRequired,
  isActive: PropTypes.bool.isRequired,
  activePinColor: PropTypes.func.isRequired,
};

export default withStyles(styleSheet)(PointColor);