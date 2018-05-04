import React, { Component, PropTypes } from 'react';
import { Redirect } from 'react-router-dom';
import { firebaseConnect, isLoaded, isEmpty } from 'react-redux-firebase';
import { connect } from 'react-redux';
import { bindActionCreators, compose } from 'redux';
import Typography from 'material-ui/Typography';
import Hidden from 'material-ui/Hidden';
import Button from 'material-ui/Button';
import { LinearProgress } from 'material-ui/Progress';
import Dialog, {
  DialogActions,
  DialogTitle,
  DialogContent,
  DialogContentText,
} from 'material-ui/Dialog';
import { withStyles } from 'material-ui/styles';

import { dialogType, waitForAuth, signInSuccess } from '../../actions';
import logo from '../../images/logo.png';
import { LeftPanel } from '../common';
import './StartPage.css';


const styles = theme => ({
  signIn: {
    background: theme.palette.primary.light,
    borderRadius: 50,
    border: 0,
    color: theme.palette.primary.contrastText,
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
});

class StartPage extends Component {
  signInAnonymously() {
    this.props.waitForAuth();
    this.props.firebase.auth()
      .signInAnonymously()
      .then((m) => {
        console.log(m.uid);
        this.props.signInSuccess();
      })
      .catch((err) => {
        this.props.dialogType(true, err.code.substring(5, err.code.length), err.message);
      });
  }
  render() {
    return (
      <div>
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
              A Location-based Game Prototype for Elderly Health Promotion
            </Typography>
            <Button
              variant="raised"
              size="large"
              classes={{
                root: this.props.classes.signIn,
                label: this.props.classes.label,
              }}
              style={{ margin: 15 }}
              onClick={() => {
                this.props.history.push({
                  pathname: '/SignIn',
                  state: {},
                });
              }}
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
              onClick={() => { this.signInAnonymously(); }}
            >
              Skip this for now
            </Button>
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
        </div>
        <div style={{ position: 'absolute', top: '99vh', width: '100vw' }}>
          {
            this.props.auth.loading &&
            <LinearProgress value={10} />
          }
        </div>
        {
          (isLoaded(this.props.fbauth) && (!isEmpty(this.props.fbauth))) &&
          <Redirect
            to={{
              pathname: '/Main',
            }}
          />
        }
      </div>
    );
  }
}

StartPage.propTypes = {
  classes: PropTypes.shape().isRequired,
  firebase: PropTypes.shape().isRequired,
  dialogType: PropTypes.func.isRequired,
  waitForAuth: PropTypes.func.isRequired,
  signInSuccess: PropTypes.func.isRequired,
  auth: PropTypes.shape({
    username: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired,
    showDialog: PropTypes.bool.isRequired,
    errorTitle: PropTypes.string.isRequired,
    errorMessage: PropTypes.string.isRequired,
    loading: PropTypes.bool.isRequired,
  }).isRequired,
  history: React.PropTypes.shape().isRequired,
  fbauth: React.PropTypes.shape().isRequired,
};

function mapStateToProps(state) {
  return {
    auth: state.auth,
    fbauth: state.firebase.auth,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ dialogType, signInSuccess, waitForAuth }, dispatch);
}

const startPage = compose(
  firebaseConnect(),
  connect(mapStateToProps, mapDispatchToProps),
)(StartPage);

// withMobileDialog 不確定是不是真的是這樣寫，還要在查
export default withStyles(styles, { withTheme: true }, { withMobileDialog: true })(startPage);
