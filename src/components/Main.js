import React from 'react';
import { withRouter } from 'react-router-dom';

import { ThreeButtonSelection } from './common/';

const Main = () => (
  <div>
    <ThreeButtonSelection
      header=""
      blue
      first="開始遊戲"
      second="查詢記錄"
      third="登出"
      clickHandler={(a) => {
        console.log(a);
       }}
    />
  </div>
);


export default withRouter(Main);
