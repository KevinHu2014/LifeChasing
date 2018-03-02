import React, { PropTypes } from 'react';
import Button from 'material-ui/Button';
import './ThreeButtonSelectionPage.css';


const ThreeButtonSelectionPage = props => (
  <div className="Container">
    <div className="Title">
      <p>請選擇起點</p>
    </div>
    <div className="Content">
      <Button variant="raised" size="large" color="primary">
        {props.first}
      </Button>
    </div>
    <div className="Content">
      <Button variant="raised" size="large" color="default">
        {props.second}
      </Button>
    </div>
    <div className="Content">
      <Button variant="raised" size="large" color="default">
        {props.third}
      </Button>
    </div>
    <div className="Content" />
  </div>
);

ThreeButtonSelectionPage.propTypes = {
  first: PropTypes.string.isRequired,
  second: PropTypes.string.isRequired,
  third: PropTypes.string.isRequired,
};

export default ThreeButtonSelectionPage;
