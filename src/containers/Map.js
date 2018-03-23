import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { compose, withProps, withHandlers, lifecycle } from 'recompose';
import { withScriptjs, withGoogleMap, GoogleMap, Marker, DirectionsRenderer } from 'react-google-maps';
import MarkerClusterer from 'react-google-maps/lib/components/addons/MarkerClusterer';
import { fetchMarkers, eatBeans } from '../actions/index';
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
      const DirectionsService = new google.maps.DirectionsService();

      DirectionsService.route({
        origin: new google.maps.LatLng(25.032854, 121.435198),
        destination: new google.maps.LatLng(25.038491, 121.431402),
        travelMode: google.maps.TravelMode.WALKING,
        provideRouteAlternatives: true,
      }, (result, status) => {
        if (status === google.maps.DirectionsStatus.OK) {
          this.setState({
            directions: result,
          });
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
      defaultZoom={17}
      defaultCenter={{ lat: 25.03515125, lng: 121.4330576875 }}
    >
      {
        props.showDirections && props.directions &&
        <DirectionsRenderer directions={props.directions} routeIndex={1} />
      }
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
  componentWillMount() {
    this.props.fetchMarkers();
  }

  componentDidMount() {
    this.GetLocationAndEatBean();
    window.addEventListener('focus', () => { console.log('window has focus'); }, false);
    window.addEventListener('blur', () => { console.log('window lost focus'); }, false);
  }

  componentWillUnmount() {
    navigator.geolocation.clearWatch(this.watchId);
  }

  GetLocationAndEatBean() {
    this.watchId = navigator.geolocation.watchPosition(
      (position) => {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;
        this.props.eatBeans(lat, lon);
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
        <h1 style={{ position: 'absolute', left: '50%', zIndex: '10' }}>{this.props.beanMap.score}</h1>
        <MapWithAMarkerClusterer id="map" markers={this.props.beanMap.markers} showDirections />
      </div>
    );
  }
}

Map.propTypes = {
  fetchMarkers: PropTypes.func.isRequired,
  eatBeans: PropTypes.func.isRequired,
  beanMap: PropTypes.shape({
    score: PropTypes.number.isRequired,
    markers: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.number.isRequired,
      latitude: PropTypes.number.isRequired,
      longitude: PropTypes.number.isRequired,
    })).isRequired,
  }).isRequired,

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
  return bindActionCreators({ fetchMarkers, eatBeans }, dispatch);
}


// Promote Map from a component to a container - it needs to know
// about this dispatch method, eatBeans. Make it as a props
export default connect(mapStateToProps, mapDispatchToProps)(Map);
