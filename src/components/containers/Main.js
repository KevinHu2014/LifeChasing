import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';
import { firebaseConnect } from 'react-redux-firebase';
import { compose } from 'recompose';

import { ThreeButtonSelection } from '../common';
import { fetchWeather } from '../../actions';

class Main extends Component {
  componentDidMount() {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;
        this.props.fetchWeather(lat, lon);
      },
      ((error) => { console.log(error.message); }),
      {
        enableHighAccuracy: true, timeout: 20000, maximumAge: 1000, distanceFilter: 10,
      },
    );
  }
  render() {
    return (
      <div>
        <ThreeButtonSelection
          header="Life Chasing"
          secondary
          first="開始遊戲"
          second="查詢記錄"
          third="登出"
          clickHandler={(a) => {
            console.log(a);
            switch (a) {
              case '開始遊戲':
                console.log('start game');
                console.log(this.props.firebaseAuth.uid);
                this.props.firebase.push(
                  'game',
                  {
                    userUid: this.props.firebaseAuth.uid,
                  },
                ).then(async (result) => {
                  // console.log(result.key);
                  this.props.history.push({
                    pathname: '/SelectInterface',
                    state: { gameKey: result.key },
                  });
                });
                break;
              case '查詢記錄':
                console.log('check record');
                this.props.history.push({
                  pathname: '/GameRecord',
                  state: {},
                });
                break;
              case '登出':
                console.log('logout');
                this.props.firebase.logout();
                this.props.history.push({
                  pathname: '/StartPage',
                  state: {},
                });
                break;
              default:
                break;
            }
          }}
        />
      </div>
    );
  }
}

Main.propTypes = {
  firebase: PropTypes.shape().isRequired,
  history: React.PropTypes.shape().isRequired,
  firebaseAuth: PropTypes.shape({
    uid: PropTypes.string.isRequired,
  }).isRequired,
  fetchWeather: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
  return {
    firebaseAuth: state.firebase.auth,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ fetchWeather }, dispatch);
}


const main = compose(
  firebaseConnect(),
  connect(mapStateToProps, mapDispatchToProps),
)(Main);

export default withRouter(main);
