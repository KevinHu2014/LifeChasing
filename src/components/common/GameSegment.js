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
    padding: theme.spacing.unit * 10.5,
    [theme.breakpoints.only('xs')]: {
      padding: theme.spacing.unit * 10.5,
    },
    [theme.breakpoints.only('sm')]: {
      padding: theme.spacing.unit * 11.5,
      backgroundColor: 'red',
    },
    [theme.breakpoints.only('md')]: {
      padding: theme.spacing.unit * 18,
      backgroundColor: 'blue',
    },
    [theme.breakpoints.only('lg')]: {
      padding: theme.spacing.unit * 18,
      backgroundColor: 'orange',
    },
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
