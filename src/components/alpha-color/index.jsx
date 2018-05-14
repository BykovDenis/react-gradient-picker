import React, {Fragment} from 'react';
import PropTypes from 'prop-types';
import injectSheet from 'react-jss'

const WIDTH_BUTTON = '20';
const HEIGHT_BUTTON = '20';
const styleSheet = {
  buttonContainer: {
    position: 'absolute',
    display: 'flex',
    transform: `translateX(-${Math.floor(WIDTH_BUTTON / 2) - 1}px)`,
    flexDirection: 'column',
    justifyContent: 'center',
    whiteSpace: 'nowrap'
  },
  button: {
    position:'relative',
    zIndex: 5,
    padding: 0,
    width: `${WIDTH_BUTTON}px`,
    height: `${HEIGHT_BUTTON}px`,
    backgroundSize: '40px 40px',
    backgroundRepeat: 'no-repeat',
    boxShadow: '0 2px 5px 0 rgba(26, 26, 27, .47)',
    backgroundColor: '#eef1f3',
    borderRadius: '50%',
    cursor: 'pointer',
    outline: 'none',
    '&:focus': {
      filter: 'drop-shadow(0 0 2px rgba(0, 0, 0, .6))',
    },
    '&:focus + div': {
      filter: 'drop-shadow(0 0 2px rgba(0, 0, 0, .6))',
    }
  }
};

function AlphaColor(props) {
  const positionX = props.data.step;
  return (
    <Fragment>
      <div className={props.classes.buttonContainer} style={{ left: `${positionX}%`}}>
        <button className={props.classes.button}>
        </button>
      </div>
    </Fragment>
  );
}


AlphaColor.defaultProps = {
  data: {}
};

AlphaColor.propTypes = {
  data: PropTypes.object.isRequired
};


export default injectSheet(styleSheet)(AlphaColor);