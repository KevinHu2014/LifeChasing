import React from 'react';
import { withRouter } from 'react-router-dom';

import { ThreeButtonSelection } from '../common/';
import { HeatMapRecord } from '../containers';

const SelectEnd = props => (
  <HeatMapRecord page="SelectEnd" gameKey={props.location.state.gameKey}>
    <ThreeButtonSelection
      header="請選擇終點"
      secondary
      first="國璽樓"
      second="輔園"
      third="中美堂"
      clickHandler={(a) => {
        props.history.push({
          pathname: '/SelectMode',
          state: {
            gameKey: props.location.state.gameKey,
            start: props.location.state.start,
            end: a,
          },
        });
      }}
    />
  </HeatMapRecord>
);

SelectEnd.propTypes = {
  history: React.PropTypes.shape().isRequired,
  location: React.PropTypes.shape().isRequired,
};

export default withRouter(SelectEnd);
