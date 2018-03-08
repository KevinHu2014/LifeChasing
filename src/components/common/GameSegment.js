import React, { Component } from 'react';
import Paper from 'material-ui/Paper';
import Grid from 'material-ui/Grid';
import Typography from 'material-ui/Typography';
import Icon from 'material-ui/Icon';
import BackAppBar from './BackAppBar';
import './GameSegment.css';

class GameSegment extends Component {
  constructor(props) {
    super(props);
    this.state = { };
  }
  render() {
    return (
      <div>
        <BackAppBar title="11/27  15:00" />
        <div className="grid">
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
                <Icon color="error" style={{ fontSize: 60 }}>trending_up</Icon>
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

export default GameSegment;
