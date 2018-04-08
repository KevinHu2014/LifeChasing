import React from 'react';
import { withRouter } from 'react-router-dom';

import ThreeButtonSelection from './common/ThreeButtonSelectionPage';

const SelectStart = props => (
  <div>
    <ThreeButtonSelection
      header="請選擇起點"
      blue
      first="捷運站"
      second="聖言樓"
      third="側門"
      clickHandler={(a) => {
        console.log(a);
        props.history.push({
          pathname: '/SelectEnd',
          state: { start: a },
        });
       }}
    />
  </div>
);

SelectStart.propTypes = {
  history: React.PropTypes.shape().isRequired,
};

export default withRouter(SelectStart);