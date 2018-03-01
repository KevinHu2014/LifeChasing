import React, { PropTypes } from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import './ThreeButtonSelectionPage.css';


const ThreeButtonSelectionPage = props => (
  <div className="Container">
    <div className="Title" style={{ backgroundColor: 'white' }}>
      <p>請選擇起點</p>
    </div>
    <div className="Content" style={{ backgroundColor: 'yellow' }}>
      <RaisedButton label={props.first} />
    </div>
    <div className="Content" style={{ backgroundColor: 'white' }}>
      <RaisedButton label={props.second} />
    </div>
    <div className="Content" style={{ backgroundColor: 'green' }}>
      <RaisedButton label={props.third} />
    </div>
    <div className="Content" style={{ backgroundColor: 'blue' }} />
  </div>
);

ThreeButtonSelectionPage.propTypes = {
  first: PropTypes.string.isRequired,
  second: PropTypes.string.isRequired,
  third: PropTypes.string.isRequired,
};

export default ThreeButtonSelectionPage;
