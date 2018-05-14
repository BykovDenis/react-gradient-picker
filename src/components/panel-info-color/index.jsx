import React from 'react';
import PropTypes from 'prop-types';
import injectSheet from 'react-jss'


const styles = {
  container: {
    maxWidth: '100%',
    minHeight: '60px',
  }
};

function PanelColorInfo(props) {
  return (
    <div className={props.classes.container}>
      
    </div>
  );
}

PanelColorInfo.defaultProps = {
  activeElement: {
    key: 1,
    step: 10,
    alpha: 1,
    color: {
      b: 185,
      g: 252,
      r: 247
    }
  }
};

PanelColorInfo.propTypes = {
  activeElement: PropTypes.object.isRequired
};

export default injectSheet(styles)(PanelColorInfo);