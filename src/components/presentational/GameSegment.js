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
                return (
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
                          time spent: {Math.round(item.expectTimeCost / 1000 / 60)} min
                        </Typography>
                        <Typography variant="title" align="left">
                          avg speed: {Math.round(item.maxSpeed * 1000) / 1000} m/s
                        </Typography>
                        <Typography variant="title" align="left">
                          distance: {item.totalDistance} km
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
                          fairy pellets: {item.totalBeans}
                        </Typography>
                        <Typography variant="title" align="left">
                          caught: {item.caughtTimes}
                        </Typography>
                      </Paper>
                    </Grid>
                  </Grid>
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
        <BackAppBar
          title="11/27  15:00"
          onPress={() => {
            this.props.history.push({
              pathname: '/GameRecord',
              state: {},
            });
          }}
        />
        {
          this.renderConent()
        }
        <div className="SegmentGrid">
          <Grid container spacing={8}>
            <Grid id="one" item xs={6} sm={6} md={4} lg={4}>
              <Paper className="paper">
                <Typography variant="display1" align="center">
                Semi automation
                </Typography>
              </Paper>
            </Grid>
            <Grid id="two" item xs={6} sm={6} md={4} lg={4}>
              <Paper className="paper">
                <Typography variant="title" align="left">
                  time spent: 10 min
                </Typography>
                <Typography variant="title" align="left">
                  avg speed: 1.3 m/s
                </Typography>
                <Typography variant="title" align="left">
                  distance: 1.5 km
                </Typography>
              </Paper>
            </Grid>
            <Grid id="three" item xs={6} sm={6} md={4} lg={4}>
              <Paper className="paper" style={{ alignItems: 'center' }}>
                <Typography variant="title" align="left">
                  Exercise Score
                </Typography>
                <Typography variant="display3" align="center" color="secondary">
                  77
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
                  80
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
                  118
                </Typography>
                <Typography variant="title" align="left">
                  highest bpm
                </Typography>
              </Paper>
            </Grid>
            <Grid id="six" item xs={6} sm={6} md={4} lg={4}>
              <Paper className="paper">
                <Typography variant="title" align="left">
                  fairy pellets: 280
                </Typography>
                <Typography variant="title" align="left">
                  caught: 1
                </Typography>
              </Paper>
            </Grid>
          </Grid>
        </div>
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
