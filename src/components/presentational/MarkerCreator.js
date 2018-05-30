import React, { Component, PropTypes } from 'react';
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firebaseConnect, isLoaded } from 'react-redux-firebase';
import { LinearProgress } from 'material-ui/Progress';
// import { I18n } from 'react-i18next';

class MarkerCreator extends Component {
  renderContent() {
    if (isLoaded(this.props.marker)) {
      if (this.props.marker === null) {
        const { start, end } = this.props.location.state;
        const key = start.lat.toString().concat(
          start.lon.toString(),
          end.lat.toString(), end.lon.toString(),
        );
        this.props.firebase.push(
          'marker',
          {
            key,
            startLat: start.lat,
            startLon: start.lon,
            endLat: end.lat,
            endLon: end.lon,
            data: 0,
            dots: 0,
          },
        ).then(() => {
          // TODO: 這裡要還需要做一個dialog，點擊Ok才回Main
          this.props.history.push({
            pathname: '/Main',
          });
        });
      } else {
        // console.log((Object.values(this.props.marker))[0].data);
        this.props.history.push({
          pathname: '/Map',
          state: {
            light: this.props.location.state.light,
            gameKey: this.props.location.state.gameKey,
            start: this.props.location.state.start,
            end: this.props.location.state.end,
            mode: this.props.location.state.mode,
            theInterface: '高齡友善',
            fitbit: this.props.location.state.fitbit,
            marker: (Object.values(this.props.marker))[0].data,
          },
        });
      }
    }
    return (<LinearProgress value={10} />);
  }
  render() {
    return (
      <div>
        {
          this.renderContent()
        }
      </div>
    );
  }
}

MarkerCreator.propTypes = {
  history: PropTypes.shape().isRequired,
  location: PropTypes.shape().isRequired,
  firebase: PropTypes.shape().isRequired,
  marker: PropTypes.shape().isRequired,
};

function mapStateToProps(state) {
  return {
    firebaseAuth: state.firebase.auth,
    marker: state.firebase.data.marker,
  };
}

const markerCreator = compose(
  firebaseConnect((props) => {
    console.log(props.location.state);
    const { start, end } = props.location.state;
    const key = start.lat.toString().concat(
      start.lon.toString(),
      end.lat.toString(), end.lon.toString(),
    );
    console.log(key);
    // be careful, listeners are not re-attached when auth state changes unless props change
    return [{
      path: '/marker',
      queryParams: [
        'orderByChild=key',
        `equalTo=${key}`,
      ],
    }];
  }),
  connect(mapStateToProps),
)(MarkerCreator);

export default withRouter(markerCreator);
