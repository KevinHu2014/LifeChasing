import React from 'react';
import { withRouter } from 'react-router-dom';

import { ThreeButtonSelection } from '../common/';
import { HeatMapRecord } from '../containers';

const SelectMode = props => (
  <HeatMapRecord page="SelectMode" gameKey={props.location.state.gameKey}>
    <ThreeButtonSelection
      header="請選擇模式"
      secondary={false}
      first="全自動"
      second="半自動"
      third="手動"
      clickHandler={(a) => {
        props.history.push({
          pathname: '/SelectFitbit',
          state: {
            gameKey: props.location.state.gameKey,
            start: props.location.state.start,
            end: props.location.state.end,
            mode: a,
          },
        });
      }}
    />
  </HeatMapRecord>
);

SelectMode.propTypes = {
  history: React.PropTypes.shape().isRequired,
  location: React.PropTypes.shape().isRequired,
};

export default withRouter(SelectMode);
