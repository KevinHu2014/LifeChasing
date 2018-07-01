import React, { Component, PropTypes } from 'react';
import Paper from 'material-ui/Paper';
import Grid from 'material-ui/Grid';
import Typography from 'material-ui/Typography';
import HeartPulse from 'mdi-material-ui/HeartPulse';
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firebaseConnect, isLoaded } from 'react-redux-firebase';

import { BackAppBar } from '../common';
import './GameSegment.css';

class GameSegment extends Component {
  constructor(props) {
    super(props);
    this.state = { };
  }

  renderConent() {
    if (isLoaded(this.props.game)) {
      console.log(this.props.game);
      const gameItem = Object.keys(this.props.game).map(i => (
        Object.assign(this.props.game[i], { key: i })
      ));
      return (
        <div className="SegmentGrid">
          {
            Object.values(gameItem).map((item) => {
              if (item.key === this.props.location.state.key) {
                const date = new Date(item.startTime);
                return (
                  <div>
                    <BackAppBar
                      title={`${date.toLocaleDateString()} ${date.toLocaleTimeString()}`}
                      onPress={() => {
                        this.props.history.push({
                          pathname: '/GameRecord',
                          state: {},
                        });
                      }}
                    />
                    <Grid key={item.key} container spacing={8}>
                      <Grid id="one" item xs={6} sm={6} md={4} lg={4}>
                        <Paper className="paper">
                          <Typography variant="display1" align="center">
                            {item.mode}
                          </Typography>
                        </Paper>
                      </Grid>
                      <Grid id="two" item xs={6} sm={6} md={4} lg={4}>
                        <Paper className="paper">
                          <Typography variant="title" align="left">
                            time spent: {Math.round(item.timeSpent / 1000)} s
                          </Typography>
                          <Typography variant="title" align="left">
                            max speed: {Math.round(item.maxSpeed * 1000) / 1000} m/s
                          </Typography>
                          <Typography variant="title" align="left">
                            distance: {Math.round(item.totalDistance)} m
                          </Typography>
                        </Paper>
                      </Grid>
                      <Grid id="three" item xs={6} sm={6} md={4} lg={4}>
                        <Paper className="paper" style={{ alignItems: 'center' }}>
                          <Typography variant="title" align="left">
                            Exercise Score
                          </Typography>
                          <Typography variant="display3" align="center" color="secondary">
                            {Math.round(item.sportScore * 100) / 100}
                          </Typography>
                          <Typography variant="title" align="left">
                            points
                          </Typography>
                        </Paper>
                      </Grid>
                      <Grid id="four" item xs={6} sm={6} md={4} lg={4}>
                        <Paper className="paper" style={{ alignItems: 'center' }}>
                          <Typography variant="title" align="left">
                            Game Score
                          </Typography>
                          <Typography variant="display3" align="center" color="secondary">
                            {Math.round(item.gameScore * 100) / 100}
                          </Typography>
                          <Typography variant="title" align="left">
                            points
                          </Typography>
                        </Paper>
                      </Grid>
                      <Grid id="five" item xs={6} sm={6} md={4} lg={4}>
                        <Paper className="paper" style={{ alignItems: 'center' }}>
                          <HeartPulse color="error" style={{ width: '60px', height: '60px' }} />
                          <Typography variant="display1" align="center" color="secondary">
                            {item.heartRate}
                          </Typography>
                          <Typography variant="title" align="left">
                            highest bpm
                          </Typography>
                        </Paper>
                      </Grid>
                      <Grid id="six" item xs={6} sm={6} md={4} lg={4}>
                        <Paper className="paper">
                          <Typography variant="title" align="left">
                            fairy pellets: {item.beanEaten}
                          </Typography>
                          <Typography variant="title" align="left">
                            caught: {item.caughtTimes}
                          </Typography>
                        </Paper>
                      </Grid>
                    </Grid>
                  </div>
                );
              }
              return true;
            })
          }
        </div>
      );
    }
    return true;
  }

  render() {
    return (
      <div>
        {
          this.renderConent()
        }
      </div>
    );
  }
}

GameSegment.propTypes = {
  history: PropTypes.shape().isRequired,
  game: PropTypes.shape().isRequired,
  location: PropTypes.shape().isRequired,
};

function mapStateToProps(state) {
  return {
    game: state.firebase.data.game,
  };
}

const gameSegment = compose(
  firebaseConnect(() => ({
    path: '/game/',
  })),
  connect(mapStateToProps),
)(GameSegment);

export default withRouter(gameSegment);
