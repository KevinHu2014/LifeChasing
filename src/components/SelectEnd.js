import React from 'react';
import ThreeButtonSelection from './common/ThreeButtonSelectionPage';


const SelectEnd = () => (
  <div>
    <ThreeButtonSelection
      header="請選擇終點"
      first="國璽樓"
      second="輔園"
      third="中美堂"
      clickHandler={(a) => {
        console.log(a);
        // console.log(this.props.location.state.start);
      }}
    />
  </div>
);

export default SelectEnd;
