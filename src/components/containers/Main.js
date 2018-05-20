import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';
import { firebaseConnect } from 'react-redux-firebase';
import { compose } from 'recompose';
import { I18n } from 'react-i18next';
import i18n from '../../i18n';

import { ThreeButtonSelection } from '../common';
import { fetchWeather, checkWeatherCondition } from '../../actions';

class Main extends Component {
  componentDidMount() {
    i18n.changeLanguage('en');
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
      <I18n>
        {
          t => (
            <div>
              <ThreeButtonSelection
                header={t('title')}
                secondary
                first="開始遊戲"
                second="查詢記錄"
                third="登出"
                clickHandler={(a) => {
                  console.log(a);
                  const {
                    weatherID, sunrise, sunset, light,
                  } = this.props.weather;
                  switch (a) {
                    case '開始遊戲':
                      console.log('start game');
                      console.log(this.props.firebaseAuth.uid);
                      this.props.checkWeatherCondition(new Date().getTime());
                      this.props.firebase.push(
                        'game',
                        {
                          userUid: this.props.firebaseAuth.uid,
                          weatherID,
                          sunrise,
                          sunset,
                          light,
                        },
                      ).then(async (result) => {
                        // console.log(result.key);
                        this.props.history.push({
                          pathname: '/SelectInterface',
                          state: { gameKey: result.key, light },
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
          )
        }
      </I18n>
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
  checkWeatherCondition: PropTypes.func.isRequired,
  weather: PropTypes.shape().isRequired,
};

function mapStateToProps(state) {
  return {
    firebaseAuth: state.firebase.auth,
    weather: state.weather,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ fetchWeather, checkWeatherCondition }, dispatch);
}


const main = compose(
  firebaseConnect(),
  connect(mapStateToProps, mapDispatchToProps),
)(Main);

export default withRouter(main);
