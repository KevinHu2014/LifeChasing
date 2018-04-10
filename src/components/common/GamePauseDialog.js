import React, { PropTypes } from 'react';
import List, { ListItem, ListItemAvatar, ListItemText } from 'material-ui/List';
import Avatar from 'material-ui/Avatar';
import PillIcon from 'mdi-material-ui/Pill';
import GhostIcon from 'mdi-material-ui/Ghost';
import SpeedIcon from 'mdi-material-ui/Speedometer';

const GamePauseDialog = props => (
  <div>
    <List>
      <ListItem key="pill">
        <ListItemAvatar>
          <Avatar>
            <PillIcon />
          </Avatar>
        </ListItemAvatar>
        <ListItemText style={{ paddingLeft: 100 }} primary={`${props.pill} pills`} />
      </ListItem>
      <ListItem key="ghost">
        <ListItemAvatar>
          <Avatar>
            <GhostIcon />
          </Avatar>
        </ListItemAvatar>
        <ListItemText style={{ paddingLeft: 100 }} primary={`${props.ghost} times`} />
      </ListItem>
      <ListItem key="speed">
        <ListItemAvatar>
          <Avatar>
            <SpeedIcon />
          </Avatar>
        </ListItemAvatar>
        <ListItemText style={{ paddingLeft: 100 }} primary={`${props.speed} km/hr`} />
      </ListItem>
    </List>
  </div>
);

GamePauseDialog.propTypes = {
  pill: PropTypes.number.isRequired,
  ghost: PropTypes.number.isRequired,
  speed: PropTypes.number.isRequired,
};

export default GamePauseDialog;
