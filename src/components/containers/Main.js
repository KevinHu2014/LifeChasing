import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';
import { firebaseConnect } from 'react-redux-firebase';
import { compose } from 'recompose';
import { I18n } from 'react-i18next';
import { LinearProgress } from 'material-ui/Progress';

import { ThreeButtonSelection } from '../common';
import { fetchWeather } from '../../actions';

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
    };
  }
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
      <I18n>
        {
          t => (
            <div>
              <ThreeButtonSelection
                header={t('main.title')}
                secondary
                first={t('main.start_game')}
                second={t('main.see_record')}
                third={t('main.logout')}
                clickHandler={(a) => {
                  console.log(a);
                  this.setState({ loading: true });
                  const {
                    weatherID, sunrise, sunset, light,
                  } = this.props.weather;
                  switch (a) {
                    case t('main.start_game'):
                      console.log('start game');
                      console.log(this.props.firebaseAuth.uid);
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
                        this.setState({ loading: false });
                        this.props.history.push({
                          pathname: '/SelectInterface',
                          state: { gameKey: result.key, light },
                        });
                      });
                      break;
                    case t('main.see_record'):
                      console.log('check record');
                      this.setState({ loading: false });
                      this.props.history.push({
                        pathname: '/GameRecord',
                        state: {},
                      });
                      break;
                    case t('main.logout'):
                      console.log('logout');
                      this.props.firebase.logout();
                      this.setState({ loading: false });
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
              <div style={{ position: 'absolute', top: '99vh', width: '100vw' }}>
                {
                  this.state.loading &&
                  <LinearProgress value={10} />
                }
              </div>
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
  weather: PropTypes.shape().isRequired,
};

function mapStateToProps(state) {
  return {
    firebaseAuth: state.firebase.auth,
    weather: state.weather,
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
