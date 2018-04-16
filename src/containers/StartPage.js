import React, { Component, PropTypes } from 'react';
import { firebaseConnect } from 'react-redux-firebase';
import Typography from 'material-ui/Typography';
import Hidden from 'material-ui/Hidden';
import Button from 'material-ui/Button';
import { withStyles } from 'material-ui/styles';

import logo from '../images/logo.png';
import { LeftPanel } from '../components/common';
import './StartPage.css';

const styles = {
  signIn: {
    background: '#ff71ca',
    borderRadius: 50,
    border: 0,
    color: 'white',
    height: 48,
    width: 200,
    padding: '0 30px',
  },
  skip: {
    color: '#9E9E9E',
  },
  label: {
    textTransform: 'capitalize',
  },
};

// eslint-disable-next-line react/prefer-stateless-function
class StartPage extends Component {
  render() {
    return (
      <div className="StartPage-Box">
        <Hidden smDown>
          <LeftPanel />
        </Hidden>
        <div className="StartPage-Content">
          <img src={logo} className="StartPage-Image" alt="StartPage" />
          <Typography variant="title">
              Life Chasing
          </Typography>
          <Typography variant="caption" style={{ margin: 15, marginBottom: 0 }}>
             Consequat esse amet aliqua labore adipisicing
             aute.
          </Typography>
          <Button
            variant="raised"
            size="large"
            color="primary"
            classes={{
              root: this.props.classes.signIn,
              label: this.props.classes.label,
            }}
            style={{ margin: 15 }}
            onClick={() => { console.log('clicked!'); }}
          >
            Sign in
          </Button>
          <Button
            variant="flat"
            size="medium"
            color="default"
            classes={{
              root: this.props.classes.skip,
              label: this.props.classes.label,
            }}
            style={{ position: 'absolute', top: '80vh', left: 'atuo' }}
            onClick={() => { console.log('clicked!'); }}
          >
            Skip this for now
          </Button>
        </div>
      </div>
    );
  }
}

StartPage.propTypes = {
  classes: PropTypes.shape.isRequired,
};

export default withStyles(styles)(firebaseConnect()(StartPage));
