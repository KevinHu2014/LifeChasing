import React from 'react';
import { withRouter } from 'react-router-dom';

import { ThreeButtonSelection } from '../common/';


const SelectInterface = props => (
  <div>
    <ThreeButtonSelection
      header="請選擇模式"
      secondary={false}
      first="Materail"
      second="高齡友善"
      third="隨機"
      clickHandler={(select) => {
        switch (select) {
          case 'Materail':
            break;
          case '高齡友善':
            props.history.push({
              pathname: '/SelectStart',
            });
            break;
          case '隨機':
            break;
          default:
            break;
        }
      }}
    />
  </div>
);

SelectInterface.propTypes = {
  history: React.PropTypes.shape().isRequired,
};

export default withRouter(SelectInterface);
