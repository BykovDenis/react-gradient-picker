import React, {Fragment} from 'react';
import PropTypes from 'prop-types';
import PointColor from '../point-color';

function PointsColor(props) {
  const colorsButtons = props.data.map(elem =>
    <PointColor
      key={`color-${elem.key}`}
      data={elem}
      activePinColor={props.activePinColor}
    />
  );
  return (
    <Fragment>
      {colorsButtons}
    </Fragment>
  );
}

PointsColor.defauldtProps = {
  data: [],
  styleGradientPanel: '',
  activePinColor: () => {},
};

PointsColor.propTypes = {
  data: PropTypes.array.isRequired,
  activePinColor: PropTypes.func.isRequired,
};

export default PointsColor;