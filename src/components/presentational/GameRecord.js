import React, { Component, PropTypes } from 'react';
import List, { ListItem, ListItemText } from 'material-ui/List';
import Avatar from 'material-ui/Avatar';
import Divider from 'material-ui/Divider';
import { withRouter } from 'react-router-dom';

import { BackAppBar } from '../common';

class GameRecord extends Component {
  constructor(props) {
    super(props);
    this.state = { };
  }
  render() {
    return (
      <div>
        <BackAppBar
          title="Game Records"
          onPress={() => {
            this.props.history.push({
              pathname: '/Main',
              state: {},
            });
          }}
        />
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

GameRecord.propTypes = {
  history: PropTypes.shape().isRequired,
};

export default withRouter(GameRecord);
