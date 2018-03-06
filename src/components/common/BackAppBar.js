import React, { PropTypes } from 'react';
import { withStyles } from 'material-ui/styles';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import IconButton from 'material-ui/IconButton';
import BackIcon from 'material-ui-icons/ArrowBack';

const styles = {
  root: {
    flexGrow: 1,
  },
  flex: {
    flex: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
};

function BackAppBar(props) {
  const { classes, title } = props;
  return (
    <AppBar position="static" color="primary">
      <Toolbar>
        <IconButton className={classes.menuButton} color="inherit" aria-label="Back">
          <BackIcon />
        </IconButton>
        <Typography variant="title" color="inherit">
          {title}
        </Typography>
      </Toolbar>
    </AppBar>
  );
}

BackAppBar.propTypes = {
  classes: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  title: PropTypes.string.isRequired,
};

export default withStyles(styles)(BackAppBar);
