import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { firebaseConnect } from 'react-redux-firebase';
import { bindActionCreators } from 'redux';
import { compose, withProps, withHandlers, lifecycle } from 'recompose';
import { withRouter } from 'react-router-dom';
import createHistory from 'history/createBrowserHistory';
import { withScriptjs, withGoogleMap, GoogleMap, Marker, DirectionsRenderer } from 'react-google-maps';
import MarkerClusterer from 'react-google-maps/lib/components/addons/MarkerClusterer';
import { I18n } from 'react-i18next';
import i18n from 'i18next';

import Button from 'material-ui/Button';
import { initPosition, eatBeans, setTimer, checkTimeOut, calSpeed, gameDialog, gameEnd, importMarkers } from '../../actions';
import { MapDialog, GameStartDialog, GamePauseDialog, GameEndDialog } from '../common';
import Distance from '../../Distance';
import HeatMapRecord from './HeatMapRecord';

const history = createHistory();

/* global google */
const MapWithAMarkerClusterer = compose(
  withProps({
    googleMapURL: 'https://maps.googleapis.com/maps/api/js?key=AIzaSyC6u4b84tBPokRRlbVhzXorKh93BzP9OPA',
    loadingElement: <div style={{ height: '100%' }} />,
    containerElement: <div style={{ height: '100vh' }} />,
    mapElement: <div style={{ height: '100%' }} />,
  }),
  withHandlers({
    onMarkerClustererClick: () => (markerClusterer) => {
      const clickedMarkers = markerClusterer.getMarkers();
      console.log(`Current clicked markers length: ${clickedMarkers.length}`);
      console.log(clickedMarkers);
    },
  }),
  withScriptjs,
  withGoogleMap,
  lifecycle({
    componentDidMount() {
      console.log(this.props);
      const DirectionsService = new google.maps.DirectionsService();
      DirectionsService.route({
        origin: new google.maps.LatLng(this.props.start.lat, this.props.start.lon),
        destination: new google.maps.LatLng(this.props.end.lat, this.props.end.lon),
        travelMode: google.maps.TravelMode.WALKING,
        provideRouteAlternatives: true,
      }, (result, status) => {
        if (status === google.maps.DirectionsStatus.OK) {
          this.setState({
            directions: result,
          });
          // duration 的值 還不知道怎麼傳到 parent
          // console.log(result.routes[1].legs[0].duration.value);
          // console.log(result);
        } else {
          console.error(`error fetching directions ${result}`);
        }
      });
    },
  }),
)(props =>
  (
    <GoogleMap
      defaultZoom={21}
      // 關閉地圖種類的切換、放大縮小、街景
      defaultOptions={{
        mapTypeControl: false,
        zoomControl: false,
        streetViewControl: false,
      }}
      defaultCenter={{ lat: props.start.lat, lng: props.start.lon }}
    >
      {
        props.showDirections && props.directions &&
        <I18n>
          {
            /*
              這裡直接寫死
              如果是高齡友善介面 則選擇 較遠的 route
              如果是Material 介面 則選擇 近的
            */
            t => (
              <DirectionsRenderer
                directions={props.directions}
                routeIndex={(props.interface === t('interface.elder_friendly')) ? 2 : 0}
              />
            )
          }
        </I18n>
      }
      <MarkerClusterer
        onClick={props.onMarkerClustererClick}
        averageCenter
        enableRetinaIcons
        gridSize={60}
      >
        {props.markers.map(marker => (
          <Marker
          // bean marker
            key={marker.id}
            icon={{
              url: 'https://firebasestorage.googleapis.com/v0/b/life-chasing.appspot.com/o/candy.png?alt=media&token=48fc705b-8bdc-48fb-9bd3-72669cb55f35', // pass your image here
            }}
            onClick={() => { console.log(`${marker.latitude}, ${marker.longitude}`); }}
            position={{ lat: marker.latitude, lng: marker.longitude }}
          />
          ))}
      </MarkerClusterer>
      {
        props.ghost &&
        <Marker
        // ghost marker
          icon={{
            url: 'https://firebasestorage.googleapis.com/v0/b/life-chasing.appspot.com/o/ghost.png?alt=media&token=e03894b1-5f40-4345-b174-18388b916cca',
          }}
          position={{ lat: props.ghostPosition.latitude, lng: props.ghostPosition.longitude }}
        />
      }
      <Marker
      // user loation marker
        icon={{
          url: 'https://firebasestorage.googleapis.com/v0/b/life-chasing.appspot.com/o/center.png?alt=media&token=6d6940b0-472f-4f83-bd1e-80b6da456767',
        }}
        position={{ lat: props.userlocationLat, lng: props.userlocationLon }}
      />
    </GoogleMap>));


class Map extends Component {
  constructor(props) {
    super(props);
    this.state = {
      expectTimeCost: 800000, // milliseconds
      expectDistance: 1.1, // km
      destination: {
        lat: this.props.location.state.end.lat,
        lng: this.props.location.state.end.lon,
      },
      totalBeans: this.props.location.state.dots,
      w1: 1,
      w2: 5,
      sd: 5.4, // Default exercise speed (km/hr)
      locationUpdateTime: new Date().getTime(),
      startTime: new Date().getTime(),
    };// 暫時 hard code
  }
  componentWillMount() {
    this.props.importMarkers(this.props.location.state.marker);
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;
        this.props.initPosition(lat, lon);
      },
      ((error) => { console.log(error.message); }),
      {
        enableHighAccuracy: true, timeout: 20000, maximumAge: 1000, distanceFilter: 10,
      },
    );
  }

  componentDidMount() {
    // disable back button
    window.onpopstate = () => {
      history.go(1);
    };

    window.addEventListener('focus', () => {
      console.log('window has focus');
      if (!(this.props.beanMap.gameStartDialog)) {
        this.props.gameDialog('pause', true);
        setTimeout(() => {
          this.props.gameDialog('pause', false);
        }, 1000 * 15); // 15 seconds
      }
    }, false);
    window.addEventListener('blur', () => {
      console.log('window lost focus');
    }, false);
  }

  componentWillUnmount() {
    navigator.geolocation.clearWatch(this.watchId);
  }

  SetAlarm(minutes) {
    this.props.setTimer(minutes);
    setTimeout(() => {
      this.props.checkTimeOut(new Date().getTime() >= this.props.beanMap.alarm);
    }, 1000 * 60 * minutes);
  }

  GetLocationAndEatBean() {
    this.watchId = navigator.geolocation.watchPosition(
      (position) => {
        const {
          destination, totalBeans, expectTimeCost,
          expectDistance, w1, w2, sd, locationUpdateTime,
          startTime,
        } = this.state;
        const { latitude, longitude } = this.props.beanMap;
        const lat = position.coords.latitude;
        const lng = position.coords.longitude;
        this.SetAlarm(0.1); // input is minute
        this.props.eatBeans(lat, lng);
        this.props.calSpeed(lat, lng, new Date().getTime());
        // 距離上一次移動了多少
        let move = Distance(lat, lng, latitude, longitude, 'K');
        move = Math.round(move * 1000) / 1000; // 四捨五入
        move *= 1000; // 1 Km = 1000m
        const timeSinceLastMove = (new Date().getTime() - locationUpdateTime) / 1000; // s
        // 在全自動模式下，關閉這個功能
        if (this.props.location.state.mode !== i18n.t('mode.full')) {
          // 前一分鐘不要觸發地點小於 0.5 m/s 的鬼魂
          if (locationUpdateTime > startTime + (1000 * 60)) {
            // 如果移動小於 0.5 m/s，則放出鬼魂
            if ((move / timeSinceLastMove) < 0.5) {
              this.props.checkTimeOut(true); // 直接放出鬼魂
            }
          }
        }

        this.setState({ locationUpdateTime: new Date().getTime() });

        // 距離終點有多遠
        let dist = Distance(lat, lng, destination.lat, destination.lng, 'K');
        dist = Math.round(dist * 1000) / 1000; // 四捨五入
        dist *= 1000; // 1 Km = 1000m
        console.log(dist);
        if (dist < 10) {
          console.log('game end');
          this.props.gameEnd(
            totalBeans, expectTimeCost, expectDistance,
            w1, w2, sd, new Date().getTime(),
          );
        }
        console.log('location changed!');
      },
      ((error) => { console.log(error.message); }),
      {
        enableHighAccuracy: true, timeout: 20000, maximumAge: 1000, distanceFilter: 10,
      },
    );
  }

  render() {
    const {
      mode, light, gameKey, theInterface, start, fitbit,
      end,
    } = this.props.location.state;
    const {
      markers, ghost, ghostPosition,
      score, ghostCounter, distance, totalTime, maxSpeed,
      gameScore, sportScore, avgSpeed, gamePauseDialog,
      gameStartDialog, gameEndDialog, latitude, longitude,
    } = this.props.beanMap;
    return (
      <I18n>
        {
          t => (
            <HeatMapRecord
              page="Map"
              light={light}
              gameKey={gameKey}
            >
              <h1 style={{ position: 'absolute', left: '50%', zIndex: '10' }}>{score}</h1>
              <MapWithAMarkerClusterer
                id="map"
                start={start}
                end={end}
                interface={theInterface}
                markers={markers}
                showDirections={mode === t('mode.semi')}
                ghost={ghost}
                ghostPosition={ghostPosition}
                userlocationLat={latitude}
                userlocationLon={longitude}
              />
              <MapDialog
                id="start"
                title={t('map.start')}
                buttonText="ok"
                open={gameStartDialog}
                onClose={() => {
                  // 開始遊戲後才去抓使用者位置
                  this.GetLocationAndEatBean();
                  const current = new Date().getTime();
                  this.setState({ startTime: current });
                  this.props.gameDialog('start', false);
                  this.props.firebase.update(
                    `game/${gameKey}`,
                    {
                      mode,
                      interface: theInterface,
                      startTime: current,
                      fitbitStart: new Date().toLocaleTimeString('en-US', { hour12: false, timeZone: 'Asia/Shanghai' }),
                      gameDate: (new Date().toLocaleDateString().split('/')).join('-'),
                    },
                  );
                }}
              >
                <GameStartDialog mode={mode} />
              </MapDialog>
              <MapDialog
                id="pause"
                title={t('map.pause')}
                buttonText="continue"
                open={gamePauseDialog}
                onClose={() => {
                  this.props.gameDialog('pause', false);
                }}
              >
                <GamePauseDialog pill={score} ghost={ghostCounter} speed={avgSpeed} />
              </MapDialog>
              <MapDialog
                id="end"
                title={t('map.end')}
                buttonText="ok"
                open={gameEndDialog}
                onClose={() => {
                  const { totalBeans, expectTimeCost } = this.state; // hard code
                  // console.log(this.state.gameKey);
                  this.props.firebase.update(
                    `game/${gameKey}`,
                    {
                      mode,
                      fitbit,
                      beanEaten: score,
                      caughtTimes: ghostCounter,
                      totalDistance: distance,
                      timeSpent: totalTime,
                      endTime: new Date().getTime(),
                      fitbitEnd: new Date().toLocaleTimeString('en-US', { hour12: false, timeZone: 'Asia/Shanghai' }),
                      heartRate: 0, // hard code
                      maxSpeed,
                      gameScore,
                      sportScore,
                      totalBeans,
                      expectTimeCost,
                    },
                  );
                  this.props.gameDialog('end', false);
                  // TODO: Discuss whether to go to GameSegment or back to Main
                  this.props.history.push({
                    pathname: '/GameSegment',
                    state: { key: gameKey },
                  });
                }}
              >
                <GameEndDialog
                  pill={score}
                  exercise={sportScore}
                  game={gameScore}
                />
              </MapDialog>
              <Button
                onClick={() => {
                  const {
                    totalBeans, expectTimeCost,
                    expectDistance, w1, w2, sd,
                  } = this.state;
                  this.props.gameEnd(
                    totalBeans, expectTimeCost, expectDistance,
                    w1, w2, sd, new Date().getTime(),
                  );
                }}
                color="primary"
                autoFocus
              >
                end
              </Button>
            </HeatMapRecord>
          )
        }
      </I18n>
    );
  }
}

Map.propTypes = {
  initPosition: PropTypes.func.isRequired,
  eatBeans: PropTypes.func.isRequired,
  setTimer: PropTypes.func.isRequired,
  checkTimeOut: PropTypes.func.isRequired,
  calSpeed: PropTypes.func.isRequired,
  importMarkers: PropTypes.func.isRequired,
  gameDialog: PropTypes.func.isRequired,
  gameEnd: PropTypes.func.isRequired,
  beanMap: PropTypes.shape({
    alarm: PropTypes.number.isRequired,
    latitude: PropTypes.number.isRequired,
    longitude: PropTypes.number.isRequired,
    score: PropTypes.number.isRequired,
    markers: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.string.isRequired,
      latitude: PropTypes.number.isRequired,
      longitude: PropTypes.number.isRequired,
    })).isRequired,
    gameStartDialog: PropTypes.bool.isRequired,
    gamePauseDialog: PropTypes.bool.isRequired,
    gameEndDialog: PropTypes.bool.isRequired,
    ghost: PropTypes.bool.isRequired,
    ghostPosition: PropTypes.shape({
      latitude: PropTypes.number.isRequired,
      longitude: PropTypes.number.isRequired,
    }).isRequired,
    ghostCounter: PropTypes.number.isRequired,
    distance: PropTypes.number.isRequired,
    totalTime: PropTypes.number.isRequired,
    avgSpeed: PropTypes.number.isRequired,
    maxSpeed: PropTypes.number.isRequired,
    gameScore: PropTypes.number.isRequired,
    sportScore: PropTypes.number.isRequired,
  }).isRequired,
  location: PropTypes.shape().isRequired,
  firebase: PropTypes.shape().isRequired,
  history: React.PropTypes.shape().isRequired,
};

function mapStateToProps(state) {
  // Whatever is returned will show up as props inside the Map
//   console.log(state);
  return {
    beanMap: state.beanMap,
  };
}

// Anything return from this function will end up as props
// on the Map container
function mapDispatchToProps(dispatch) {
  // Whenever eatBeans is called, the results should be
  // pass to all our reducers
  return bindActionCreators({
    initPosition,
    eatBeans,
    setTimer,
    checkTimeOut,
    calSpeed,
    gameDialog,
    gameEnd,
    importMarkers,
  }, dispatch);
}


// Promote Map from a component to a container - it needs to know
// about this dispatch method, eatBeans. Make it as a props
const map = compose(
  firebaseConnect(),
  connect(mapStateToProps, mapDispatchToProps),
)(Map);
export default withRouter(map);
