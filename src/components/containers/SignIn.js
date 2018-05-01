import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, compose } from 'redux';
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
  emailChanged,
  passwordChanged,
  dialogType,
  signInSuccess,
} from '../../actions';
import { LeftPanel } from '../common';
import './SignUp.css';
import ghost from '../../images/ghost.png';

const styles = theme => ({
  signIn: {
    background: theme.palette.primary.main,
    borderRadius: 50,
    border: 0,
    color: theme.palette.primary.contrastText,
    width: 200,
    height: 48,
    margin: 30,
    padding: '0 30px',
  },
  register: {
    color: theme.palette.primary.main,
    width: 150,
  },
  forgot: {
    color: theme.palette.primary.main,
    marginLeft: 100,
  },
  label: {
    textTransform: 'capitalize',
  },
  textField: {
    width: 250,
  },
});

class SignIn extends Component {
  signInUser(email, password) {
    if (email.length === 0) {
      this.props.dialogType(true, 'Email-required', 'Please enter your email.');
    } else if (password.length === 0) {
      this.props.dialogType(true, 'Password-required', 'Please enter your passwords.');
    } else {
      this.props.firebase.login({
        email,
        password,
      })
        .then((m) => {
          console.log(m);
          this.props.signInSuccess();
          this.props.history.push({
            pathname: '/Main',
            state: { login: true },
          });
        })
        .catch((err) => {
          console.log(err.code);
          this.props.dialogType(true, err.code.substring(5, err.code.length), err.message);
        });
    }
  }
  sendResetEmail(email) {
    if (email.length === 0) {
      this.props.dialogType(true, 'Email-required', 'Please enter your email.');
    } else {
      this.props.firebase.auth()
        .sendPasswordResetEmail(email)
        .then(() => {
          console.log('email sent successfully');
          this.props.dialogType(true, 'Email sent successfully', 'Please check your email.');
        })
        .catch((err) => {
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
        <Paper className="SignUp-Form" style={{ backgroundColor: '#efefef' }}>
          <img src={ghost} style={{ width: 'auto', height: 150 }} alt="ghost" />
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
            variant="flat"
            size="small"
            color="default"
            classes={{
              root: this.props.classes.forgot,
              label: this.props.classes.label,
            }}
            onClick={() => { this.sendResetEmail(this.props.auth.email); }}
          >
            Forgot your password?
          </Button>
          <Button
            variant="raised"
            size="large"
            color="primary"
            classes={{
              root: this.props.classes.signIn,
            }}
            onClick={() => {
              const { email, password } = this.props.auth;
              this.signInUser(email, password);
            }}
          >
            SIGN IN
          </Button>
          <Typography variant="caption">
              Don‘t have an account?
          </Typography>
          <Button
            variant="flat"
            size="large"
            color="default"
            classes={{
              root: this.props.classes.register,
            }}
            onClick={() => {
              this.props.history.push({
                pathname: '/SignUp',
                state: {},
              });
            }}
          >
            Register
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

SignIn.propTypes = {
  classes: PropTypes.shape({
    forgot: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    signIn: PropTypes.string.isRequired,
    register: PropTypes.string.isRequired,
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
  emailChanged: PropTypes.func.isRequired,
  passwordChanged: PropTypes.func.isRequired,
  signInSuccess: PropTypes.func.isRequired,
  dialogType: PropTypes.func.isRequired,
  firebase: PropTypes.shape().isRequired,
  history: React.PropTypes.shape().isRequired,
};

function mapStateToProps(state) {
  return {
    auth: state.auth,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    emailChanged,
    passwordChanged,
    dialogType,
    signInSuccess,
  }, dispatch);
}


const signIn = compose(
  firebaseConnect(),
  connect(mapStateToProps, mapDispatchToProps),
)(SignIn);

// withMobileDialog 不確定是不是真的是這樣寫，還要在查
export default withStyles(styles, { withTheme: true }, { withMobileDialog: true })(signIn);
