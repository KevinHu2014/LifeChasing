import React, { PropTypes } from 'react';
import { withRouter } from 'react-router-dom';
import { withFirebase } from 'react-redux-firebase';

import { ThreeButtonSelection } from '../common';

const Main = props => (
  <div>
    <ThreeButtonSelection
      header="Life Chasing"
      secondary
      first="開始遊戲"
      second="查詢記錄"
      third="登出"
      clickHandler={(a) => {
        console.log(a);
        switch (a) {
          case '開始遊戲':
            console.log('start game');
            props.history.push({
              pathname: '/SelectInterface',
              state: {},
            });
            break;
          case '查詢記錄':
            console.log('check record');
            props.history.push({
              pathname: '/GameRecord',
              state: {},
            });
            break;
          case '登出':
            console.log('logout');
            props.firebase.logout();
            props.history.push({
              pathname: '/StartPage',
              state: {},
            });
            break;
          default:
            break;
        }
       }}
    />
  </div>
);

Main.propTypes = {
  firebase: PropTypes.shape().isRequired,
  history: React.PropTypes.shape().isRequired,
};

export default withRouter(withFirebase(Main));
