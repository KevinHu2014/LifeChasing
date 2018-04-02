import React from 'react';
import ThreeButtonSelection from './common/ThreeButtonSelectionPage';


const SelectEnd = props => (
  <div>
    <ThreeButtonSelection
      header="請選擇終點"
      first="國璽樓"
      second="輔園"
      third="中美堂"
      clickHandler={(a) => {
        console.log(a);
        console.log(props.location.state.start);
      }}
    />
  </div>
);

SelectEnd.propTypes = {
  location: React.PropTypes.shape().isRequired,
};

export default SelectEnd;
