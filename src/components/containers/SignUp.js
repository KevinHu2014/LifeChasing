import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, compose } from 'redux';
import firebase from 'firebase';
import { firebaseConnect } from 'react-redux-firebase';
import Paper from 'material-ui/Paper';
import Typography from 'material-ui/Typography';
import Hidden from 'material-ui/Hidden';
import TextField from 'material-ui/TextField';
import Dialog, {
  DialogActions,
  DialogTitle,
  DialogContent,
  DialogContentText,
} from 'material-ui/Dialog';
import Button from 'material-ui/Button';
import { withStyles } from 'material-ui/styles';

import {
  usernameChanged,
  emailChanged,
  passwordChanged,
  dialogType,
  signUpSuccess,
} from '../../actions';
import { LeftPanel } from '../common';
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
  textField: {
    width: 250,
  },
});

// eslint-disable-next-line react/prefer-stateless-function
class SignUp extends Component {
  createNewUser({ username, email, password }) {
    if (username.length === 0) {
      this.props.dialogType(true, 'Username-required', 'Please set an username.');
    } else if (email.length === 0) {
      this.props.dialogType(true, 'Email-required', 'Please enter your email.');
    } else if (password.length === 0) {
      this.props.dialogType(true, 'Password-required', 'Please set your awesome passwords.');
    } else {
      firebase.createUser(
        { email, password },
        { username, email },
      )
        .then((m) => {
          console.log(m.username);
          this.props.signUpSuccess();
          this.props.history.push({
            pathname: '/Main',
            state: {},
          });
        })
        .catch((err) => {
          console.log(err.code);
          this.props.dialogType(true, err.code.substring(5, err.code.length), err.message);
        });
    }
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
            classes={{ root: this.props.classes.textField }}
            placeholder="User name"
            margin="normal"
            value={this.props.auth.username}
            onChange={(event) => {
              this.props.usernameChanged(event.target.value);
            }}
          />
          <TextField
            id="email-input"
            label="Email"
            classes={{ root: this.props.classes.textField }}
            placeholder="Email"
            margin="normal"
            value={this.props.auth.email}
            onChange={(event) => {
              this.props.emailChanged(event.target.value);
            }}
          />
          <TextField
            id="password-input"
            label="Password"
            classes={{ root: this.props.classes.textField }}
            type="password"
            autoComplete="current-password"
            margin="normal"
            value={this.props.auth.password}
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
              this.createNewUser({ username, email, password });
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
            onClick={() => {
              this.props.history.push({
                pathname: '/SignIn',
                state: {},
              });
            }}
          >
            or Signin
          </Button>
        </Paper>
        <Dialog open={this.props.auth.showDialog}>
          <DialogTitle>{this.props.auth.errorTitle}</DialogTitle>
          <DialogContent>
            <DialogContentText>
              {this.props.auth.errorMessage}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => { this.props.dialogType(false, '', ''); }} color="primary" autoFocus>
              close
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

SignUp.propTypes = {
  classes: PropTypes.shape({
    signUp: PropTypes.string.isRequired,
    signIn: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    textField: PropTypes.string.isRequired,
  }).isRequired,
  auth: PropTypes.shape({
    username: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired,
    showDialog: PropTypes.bool.isRequired,
    errorTitle: PropTypes.string.isRequired,
    errorMessage: PropTypes.string.isRequired,
  }).isRequired,
  usernameChanged: PropTypes.func.isRequired,
  emailChanged: PropTypes.func.isRequired,
  passwordChanged: PropTypes.func.isRequired,
  signUpSuccess: PropTypes.func.isRequired,
  dialogType: PropTypes.func.isRequired,
  history: React.PropTypes.shape().isRequired,
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
    dialogType,
    signUpSuccess,
  }, dispatch);
}


const signUp = compose(
  firebaseConnect(),
  connect(mapStateToProps, mapDispatchToProps),
)(SignUp);

// withMobileDialog 不確定是不是真的是這樣寫，還要在查
export default withStyles(styles, { withTheme: true }, { withMobileDialog: true })(signUp);
