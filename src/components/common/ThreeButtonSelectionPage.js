import React, { PropTypes } from 'react';
import Button from 'material-ui/Button';
import { withStyles } from 'material-ui/styles';
import Typography from 'material-ui/Typography';

import './ThreeButtonSelectionPage.css';

const styles = theme => ({
  btn: {
    // background: theme.palette.secondary.main,
    border: 0,
    color: theme.palette.secondary.contrastText,
    width: 200,
    height: 65,
    margin: 30,
    padding: '0 30px',
    fontSize: 25,
  },
  header: {
    color: theme.palette.primary.contrastText,
  },
});

const ThreeButtonSelectionPage = props => (
  <div className="Container">
    <div className="Title">
      <Typography
        variant="display1"
        classes={{
          root: props.classes.header,
        }}
      >
        {props.header}
      </Typography>
    </div>
    <div className="Content">
      <Button
        variant="raised"
        size="large"
        classes={{
          root: props.classes.btn,
        }}
        color={props.secondary ? 'secondary' : 'default'}
        onClick={() => { props.clickHandler(props.first); }}
      >
        {props.first}
      </Button>
      <Button
        variant="raised"
        size="large"
        classes={{
          root: props.classes.btn,
        }}
        color="default"
        onClick={() => { props.clickHandler(props.second); }}
      >
        {props.second}
      </Button>
      <Button
        variant="raised"
        size="large"
        classes={{
          root: props.classes.btn,
        }}
        color="default"
        onClick={() => { props.clickHandler(props.third); }}
      >
        {props.third}
      </Button>
    </div>
  </div>
);

ThreeButtonSelectionPage.propTypes = {
  header: PropTypes.string.isRequired,
  secondary: PropTypes.bool.isRequired,
  first: PropTypes.string.isRequired,
  second: PropTypes.string.isRequired,
  third: PropTypes.string.isRequired,
  clickHandler: PropTypes.func.isRequired,
  classes: PropTypes.shape().isRequired,
};

export default withStyles(styles, { withTheme: true })(ThreeButtonSelectionPage);
