import React, {Fragment} from 'react';
import PropTypes from 'prop-types'
import AlphaColor from '../alpha-color';

function PointsAlpha(props) {
  const alphaButtons = props.data.map(elem =>
    <AlphaColor key={`alpha-${elem.key}`} data={elem} />
  );
  return (
    <Fragment>
      {alphaButtons}
    </Fragment>
  );
}

PointsAlpha.defaultProps = {
  data: []
};

PointsAlpha.propTypes = {
  data: PropTypes.array.isRequired
};

export default PointsAlpha;
