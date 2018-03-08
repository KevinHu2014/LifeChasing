import React, { Component } from 'react';
import Paper from 'material-ui/Paper';
import Grid from 'material-ui/Grid';
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
        <BackAppBar title="Title Text" />
        <div className="grid">
          <Grid container spacing={8}>
            <Grid item xs={6} sm={6} md={4} lg={4}>
              <Paper className="paper">1</Paper>
            </Grid>
            <Grid item xs={6} sm={6} md={4} lg={4}>
              <Paper className="paper">2</Paper>
            </Grid>
            <Grid item xs={6} sm={6} md={4} lg={4}>
              <Paper className="paper">3</Paper>
            </Grid>
            <Grid item xs={6} sm={6} md={4} lg={4}>
              <Paper className="paper">4</Paper>
            </Grid>
            <Grid item xs={6} sm={6} md={4} lg={4}>
              <Paper className="paper">5</Paper>
            </Grid>
            <Grid item xs={6} sm={6} md={4} lg={4}>
              <Paper className="paper">6</Paper>
            </Grid>
          </Grid>
        </div>
      </div>
    );
  }
}

export default GameSegment;
