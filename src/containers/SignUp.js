import React, { Component, PropTypes } from 'react';
import { firebaseConnect } from 'react-redux-firebase';
import Paper from 'material-ui/Paper';
import Typography from 'material-ui/Typography';
import Hidden from 'material-ui/Hidden';
import TextField from 'material-ui/TextField';
import Button from 'material-ui/Button';
import { withStyles } from 'material-ui/styles';

import { LeftPanel } from '../components/common';
import './SignUp.css';

const styles = theme => ({
  signUp: {
    background: theme.palette.primary.main,
    borderRadius: 50,
    border: 0,
    color: theme.palette.primary.contrastText,
    width: 200,
    height: 48,
    margin: 30,
    padding: '0 30px',
  },
  signIn: {
    color: '#9E9E9E',
    width: 150,
  },
  label: {
    textTransform: 'capitalize',
  },
});

// eslint-disable-next-line react/prefer-stateless-function
class SignUp extends Component {
  render() {
    return (
      <div className="SignUp-Box">
        <Hidden smDown>
          <LeftPanel />
        </Hidden>
        <Paper className="SignUp-Form">
          <Typography variant="display1">
              Sign Up
          </Typography>
          <TextField
            id="username-input"
            label="User name"
            className="TextField"
            placeholder="User name"
            margin="normal"
            onChange={(event) => { console.log(event.target.value); }}
          />
          <TextField
            id="email-input"
            label="Email"
            className="TextField"
            placeholder="Email"
            margin="normal"
          />
          <TextField
            id="password-input"
            label="Password"
            className="TextField"
            type="password"
            autoComplete="current-password"
            margin="normal"
          />
          <Button
            variant="raised"
            size="large"
            color="primary"
            classes={{
              root: this.props.classes.signUp,
              label: this.props.classes.label,
            }}
            onClick={() => { console.log('clicked!'); }}
          >
            SIGNUP
          </Button>
          <Button
            variant="flat"
            size="large"
            color="default"
            classes={{
              root: this.props.classes.signIn,
              label: this.props.classes.label,
            }}
            onClick={() => { console.log('clicked!'); }}
          >
            or Signin
          </Button>
        </Paper>
      </div>
    );
  }
}

SignUp.propTypes = {
  classes: PropTypes.shape.isRequired,
};

export default withStyles(styles, { withTheme: true })(firebaseConnect()(SignUp));
