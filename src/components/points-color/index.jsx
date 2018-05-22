import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import PointColor from '../point-color';

function PointsColor(props) {
  const activePinColor = props.activePinColor;
  const colorsButtons = props.data.map(elem => (
    <PointColor
      key={`color-${elem.key}`}
      data={elem}
      activePinColor={activePinColor}
      isActive={props.activeElementKey === elem.key}
    />)
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
  activeElementKey: 0,
};

PointsColor.propTypes = {
  data: PropTypes.array.isRequired,
  activePinColor: PropTypes.func.isRequired,
  activeElementKey: PropTypes.number.isRequired,
};

export default PointsColor;
