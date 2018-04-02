import React from 'react';
import { withRouter } from 'react-router-dom';

import ThreeButtonSelection from './common/ThreeButtonSelectionPage';


const SelectEnd = props => (
  <div>
    <ThreeButtonSelection
      header="請選擇模式"
      blue={false}
      first="全自動"
      second="半自動"
      third="手動"
      clickHandler={(a) => {
        props.history.push({
          pathname: '/Map',
          state: {
            start: props.location.state.start,
            end: props.location.state.end,
            mode: a,
          },
        });
      }}
    />
  </div>
);

SelectEnd.propTypes = {
  history: React.PropTypes.shape().isRequired,
  location: React.PropTypes.shape().isRequired,
};

export default withRouter(SelectEnd);
