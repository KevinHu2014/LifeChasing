import React, { Component } from 'react';
import List, { ListItem, ListItemText } from 'material-ui/List';
import Avatar from 'material-ui/Avatar';
import Divider from 'material-ui/Divider';
import BackAppBar from './BackAppBar';

class GameRecord extends Component {
  constructor(props) {
    super(props);
    this.state = { };
  }
  render() {
    return (
      <div>
        <BackAppBar title="Game Records" />
        <div className="grid">
          <List>
            <ListItem>
              <Avatar>
                F
              </Avatar>
              <ListItemText primary="15 min" secondary="Jan 9, 2014" />
            </ListItem>
            <Divider />
            <ListItem>
              <Avatar>
                S
              </Avatar>
              <ListItemText primary="10 min" secondary="Jan 7, 2014" />
            </ListItem>
            <Divider />
            <ListItem>
              <Avatar>
                M
              </Avatar>
              <ListItemText primary="15 min" secondary="July 20, 2014" />
            </ListItem>
            <Divider />
          </List>
        </div>
      </div>
    );
  }
}

export default GameRecord;
