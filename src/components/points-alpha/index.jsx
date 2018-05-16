import React, {Fragment} from 'react';
import PropTypes from 'prop-types'
import AlphaColor from '../alpha-color';

function PointsAlpha(props) {
  const { activeElementKey } = props;
  const alphaButtons = props.data.map(elem =>
    <AlphaColor key={`alpha-${elem.key}`} data={elem} isActive={ activeElementKey === elem.key } />
  );
  return (
    <Fragment>
      {alphaButtons}
    </Fragment>
  );
}

PointsAlpha.defaultProps = {
  data: [],
  activeElementKey: 0,
};

PointsAlpha.propTypes = {
  data: PropTypes.array.isRequired,
  activeElementKey: PropTypes.number.isRequired,
};

export default PointsAlpha;
