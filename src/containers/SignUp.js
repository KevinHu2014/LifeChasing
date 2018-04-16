import React, { Component } from 'react';
import { firebaseConnect } from 'react-redux-firebase';
import Paper from 'material-ui/Paper';
import Typography from 'material-ui/Typography';
import Hidden from 'material-ui/Hidden';
import TextField from 'material-ui/TextField';
import Button from 'material-ui/Button';

import { LeftPanel } from '../components/common';
import './SignUp.css';
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
            style={{ margin: 15 }}
            onClick={() => { console.log('clicked!'); }}
          >
            SIGNUP
          </Button>
          <Button
            variant="flat"
            size="medium"
            color="default"
            onClick={() => { console.log('clicked!'); }}
          >
            or Signin
          </Button>
        </Paper>
      </div>
    );
  }
}


export default firebaseConnect()(SignUp);
