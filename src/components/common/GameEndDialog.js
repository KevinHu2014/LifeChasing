import React, { PropTypes } from 'react';
import List, { ListItem, ListItemAvatar, ListItemText } from 'material-ui/List';
import Avatar from 'material-ui/Avatar';
import PillIcon from 'mdi-material-ui/Pill';
import RunIcon from 'mdi-material-ui/Run';
import GameIcon from 'mdi-material-ui/GamepadVariant';

const GameEndDialog = props => (
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
      <ListItem key="exercise">
        <ListItemAvatar>
          <Avatar>
            <RunIcon />
          </Avatar>
        </ListItemAvatar>
        <ListItemText style={{ paddingLeft: 100 }} primary={`${props.exercise} ponints`} />
      </ListItem>
      <ListItem key="game">
        <ListItemAvatar>
          <Avatar>
            <GameIcon />
          </Avatar>
        </ListItemAvatar>
        <ListItemText style={{ paddingLeft: 100 }} primary={`${props.game} points`} />
      </ListItem>
    </List>
  </div>
);

GameEndDialog.propTypes = {
  pill: PropTypes.number.isRequired,
  exercise: PropTypes.number.isRequired,
  game: PropTypes.number.isRequired,
};

export default GameEndDialog;
