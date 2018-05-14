import React, {Fragment} from 'react';
import PropTypes from 'prop-types';
import PointColor from '../color-point

function ColorPoints(props) {
  const colorsButtons = props.data.map(elem =>
    <PointColor
      key={`color-${elem.key}`}
      data={elem}
      activePinColor={this.activePinColor}
    />
  );
  return (
    <Fragment>
      {colorsButtons}
    </Fragment>
  );
}

ColorPoints.defaultProps = {
  data: {}
};

ColorPoints.propTypes = {
  data: PropTypes.array.isRequired
};

export default ColorPoints;