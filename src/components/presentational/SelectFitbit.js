import React from 'react';
import { withRouter } from 'react-router-dom';

import { ThreeButtonSelection } from '../common/';


const SelectFitbit = props => (
  <div>
    <ThreeButtonSelection
      header="請選擇手環"
      secondary={false}
      first="無"
      second="藍色"
      third="黑色"
      clickHandler={(a) => {
        props.history.push({
          pathname: '/Map',
          state: {
            start: props.location.state.start,
            end: props.location.state.end,
            mode: props.location.state.mode,
            fitbit: a,
          },
        });
      }}
    />
  </div>
);

SelectFitbit.propTypes = {
  history: React.PropTypes.shape().isRequired,
  location: React.PropTypes.shape().isRequired,
};

export default withRouter(SelectFitbit);
