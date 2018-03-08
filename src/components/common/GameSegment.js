import React, { Component, PropTypes } from 'react';
import { withStyles } from 'material-ui/styles';
import Paper from 'material-ui/Paper';
import Grid from 'material-ui/Grid';
import BackAppBar from './BackAppBar';

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing.unit * 2,
    [theme.breakpoints.only('xs')]: {
      height: theme.spacing.unit * 19,
    },
    [theme.breakpoints.only('sm')]: {
      height: theme.spacing.unit * 22,
      backgroundColor: 'red',
    },
    [theme.breakpoints.only('md')]: {
      height: theme.spacing.unit * 30,
      backgroundColor: 'blue',
    },
    [theme.breakpoints.only('lg')]: {
      height: theme.spacing.unit * 35,
      backgroundColor: 'orange',
    },
    // fontSize: 60,
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
});
class GameSegment extends Component {
  constructor(props) {
    super(props);
    this.state = { };
  }
  render() {
    const { classes } = this.props;
    return (
      <div>
        <BackAppBar title="Title Text" />
        <div>
          <Grid container spacing={8}>
            <Grid item xs={6} sm={6} md={4} lg={4}>
              <Paper className={classes.paper}>xs=6</Paper>
            </Grid>
            <Grid item xs={6} sm={6} md={4} lg={4}>
              <Paper className={classes.paper}>xs=6</Paper>
            </Grid>
            <Grid item xs={6} sm={6} md={4} lg={4}>
              <Paper className={classes.paper}>xs=6</Paper>
            </Grid>
            <Grid item xs={6} sm={6} md={4} lg={4}>
              <Paper className={classes.paper}>xs=6</Paper>
            </Grid>
            <Grid item xs={6} sm={6} md={4} lg={4}>
              <Paper className={classes.paper}>xs=6</Paper>
            </Grid>
            <Grid item xs={6} sm={6} md={4} lg={4}>
              <Paper className={classes.paper}>xs=6</Paper>
            </Grid>
          </Grid>
        </div>
      </div>
    );
  }
}

GameSegment.propTypes = {
  classes: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
};

export default withStyles(styles)(GameSegment);
