import React, {Fragment} from 'react';
import PropTypes from 'prop-types';
import injectSheet from 'react-jss'

const styles = {
  container: {
    height: '100px',
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    textAlign: 'center',
  },
};

function GradientPanel(props) {

  return (
    <Fragment>
      <div
        className={props.classes.container}
        style={{ backgroundImage: props.gradientStyle }}
      />
    </Fragment>
  );
}

GradientPanel.defaultProps = {
  gradientStyle: '',
};

GradientPanel.propTypes = {
  gradientStyle: PropTypes.string.isRequired,
}

export default injectSheet(styles)(GradientPanel);