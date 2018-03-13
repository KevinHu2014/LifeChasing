import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import fetch from 'isomorphic-fetch';
import { compose, withProps, withHandlers } from 'recompose';
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from 'react-google-maps';
import MarkerClusterer from 'react-google-maps/lib/components/addons/MarkerClusterer';
import { getPoints } from '../actions/index';

const MapWithAMarkerClusterer = compose(
  withProps({
    googleMapURL: 'https://maps.googleapis.com/maps/api/js?key=AIzaSyBvVSIH17eqL5gy_M0bn3Hb_N8qYnZ7oKQ',
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
)(props =>
  (
    <GoogleMap
      defaultZoom={17}
      defaultCenter={{ lat: 25.03515125, lng: 121.4330576875 }}
    >
      <MarkerClusterer
        onClick={props.onMarkerClustererClick}
        averageCenter
        enableRetinaIcons
        gridSize={60}
      >
        {props.markers.map(marker => (
          <Marker
            key={marker.id}
            onClick={() => { console.log(`${marker.latitude}, ${marker.longitude}`); }}
            position={{ lat: marker.latitude, lng: marker.longitude }}
          />
          ))}
      </MarkerClusterer>
    </GoogleMap>));


class Map extends Component {
  constructor(props) {
    super(props);

    this.state = {
      latitude: null,
      longitude: null,
    };
  }

  componentWillMount() {
    this.setState({ markers: [] });
  }

  componentDidMount() {
    const url = [
      // Length issue
      'https://gist.githubusercontent.com',
      '/KevinHu2014/80f0dfe62528601a9ac0634c8379bee4',
      '/raw/56bd6ee4e2a86a06f8c8bb83a93807a3df3cd67e/ReactDot.json',
    ].join('');

    fetch(url)
      .then(res => res.json())
      .then((data) => {
        this.setState({ markers: data.Dots });
        console.log(data.Dots);
      });

    this.GetLocationAndEatBean();
  }

  componentWillUnmount() {
    navigator.geolocation.clearWatch(this.watchId);
  }

  GetLocationAndEatBean() {
    this.watchId = navigator.geolocation.watchPosition(
      (position) => {
        let Counter = 0;
        this.setState({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          markers: this.state.markers.filter((dot) => {
            // Eat Beans
            // 0.000045-->5m , 0.000044-->5m
            if (!(Math.abs(dot.latitude - this.state.latitude) < 0.000045 * 5
              && Math.abs(dot.longitude - this.state.longitude) < 0.000044 * 5)) {
              return dot;
            }
            Counter += 1;
            return false;
          }),
        });
        const temp = this.props.score + Counter;
        this.props.getPoints(temp);
        console.log('location changed!');
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
        <h1 style={{ textAlign: 'center' }}>{this.props.score}</h1>
        <MapWithAMarkerClusterer markers={this.state.markers} />
      </div>
    );
  }
}

Map.propTypes = {
  getPoints: PropTypes.func.isRequired,
  score: PropTypes.number.isRequired,
};

function mapStateToProps(state) {
  // Whatever is returned will show up as props inside the Map
//   console.log(state);
  return {
    score: state.points,
  };
}

// Anything return from this function will end up as props
// on the Map container
function mapDispatchToProps(dispatch) {
  // Whenever eatBeans is called, the results should be
  // pass to all our reducers
  return bindActionCreators({ getPoints }, dispatch);
}


// Promote Map from a component to a container - it needs to know
// about this dispatch method, eatBeans. Make it as a props
export default connect(mapStateToProps, mapDispatchToProps)(Map);
