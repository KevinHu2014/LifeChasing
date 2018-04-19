import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import firebase from 'firebase';
import { firebaseConnect } from 'react-redux-firebase';
import Paper from 'material-ui/Paper';
import Typography from 'material-ui/Typography';
import Hidden from 'material-ui/Hidden';
import TextField from 'material-ui/TextField';
import Button from 'material-ui/Button';
import { withStyles } from 'material-ui/styles';

import { usernameChanged, emailChanged, passwordChanged } from '../actions';
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
  static createNewUser({ username, email, password }) {
    firebase.createUser(
      { email, password },
      { username, email },
    )
      .then(() => { console.log('success!'); })
      .catch((err) => { console.log(err); });
  }
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
            onChange={(event) => {
              this.props.usernameChanged(event.target.value);
            }}
          />
          <TextField
            id="email-input"
            label="Email"
            className="TextField"
            placeholder="Email"
            margin="normal"
            onChange={(event) => {
              this.props.emailChanged(event.target.value);
            }}
          />
          <TextField
            id="password-input"
            label="Password"
            className="TextField"
            type="password"
            autoComplete="current-password"
            margin="normal"
            onChange={(event) => {
              this.props.passwordChanged(event.target.value);
            }}
          />
          <Button
            variant="raised"
            size="large"
            color="primary"
            classes={{
              root: this.props.classes.signUp,
              label: this.props.classes.label,
            }}
            onClick={() => {
              const { username, email, password } = this.props.auth;
              console.log(this.props.auth);
              SignUp.createNewUser({ username, email, password });
            }}
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
  auth: PropTypes.shape.isRequired,
  usernameChanged: PropTypes.func.isRequired,
  emailChanged: PropTypes.func.isRequired,
  passwordChanged: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
  return {
    auth: state.auth,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    usernameChanged,
    emailChanged,
    passwordChanged,
  }, dispatch);
}

const signUp = connect(mapStateToProps, mapDispatchToProps)(SignUp);
export default withStyles(styles, { withTheme: true })(firebaseConnect()(signUp));
