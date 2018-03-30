import React, { PropTypes } from 'react';
import Button from 'material-ui/Button';
import './ThreeButtonSelectionPage.css';


const ThreeButtonSelectionPage = props => (
  <div className="Container">
    <div className="Title">
      <p>{props.header}</p>
    </div>
    <div className="Content">
      <Button
        variant="raised"
        size="large"
        color="secondary"
        onClick={() => { props.clickHandler(props.first); }}
      >
        {props.first}
      </Button>
    </div>
    <div className="Content">
      <Button
        variant="raised"
        size="large"
        color="default"
        onClick={() => { props.clickHandler(props.second); }}
      >
        {props.second}
      </Button>
    </div>
    <div className="Content">
      <Button
        variant="raised"
        size="large"
        color="default"
        onClick={() => { props.clickHandler(props.third); }}
      >
        {props.third}
      </Button>
    </div>
    <div className="Content" />
  </div>
);

ThreeButtonSelectionPage.propTypes = {
  header: PropTypes.string.isRequired,
  first: PropTypes.string.isRequired,
  second: PropTypes.string.isRequired,
  third: PropTypes.string.isRequired,
  clickHandler: PropTypes.func.isRequired,
};

export default ThreeButtonSelectionPage;
