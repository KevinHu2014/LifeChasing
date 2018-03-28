import React from 'react';
import ThreeButtonSelection from './common/ThreeButtonSelectionPage';
import history from '../history';

const SelectStart = () => (
  <div>
    <ThreeButtonSelection
      header="請選擇起點"
      first="捷運站"
      second="聖言樓"
      third="側門"
      clickHandler={(a) => {
        console.log(a);
        history.push({
          pathname: '/SelectEnd',
          state: { start: a },
        });
       }}
    />
  </div>
);

export default SelectStart;
