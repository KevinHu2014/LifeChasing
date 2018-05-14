import React, { Component, PropTypes } from 'react';
import List, { ListItem, ListItemText } from 'material-ui/List';
import Avatar from 'material-ui/Avatar';
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firebaseConnect, isLoaded } from 'react-redux-firebase';
import { LinearProgress } from 'material-ui/Progress';

import { BackAppBar } from '../common';

class GameRecord extends Component {
  renderListItem() {
    if (isLoaded(this.props.game)) {
      return (
        <List>
          {
            Object.values(this.props.game).map((item) => {
              console.log(item);
              const date = new Date();
              date.setTime(item.startTime);
              // millisecond -> minute
              const costMinute = Math.round(item.expectTimeCost / 1000 / 60);
              return (
                <div key={item.startTime}>
                  <ListItem divider>
                    <Avatar>
                      {item.mode[0]}
                    </Avatar>
                    <ListItemText
                      primary={`${costMinute} Min`}
                      secondary={date.toDateString()}
                    />
                  </ListItem>
                </div>
              );
            })
          }
        </List>
      );
    }
    return (<LinearProgress value={10} />);
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
          {
            this.renderListItem()
          }
        </div>
      </div>
    );
  }
}

GameRecord.propTypes = {
  history: PropTypes.shape().isRequired,
  game: PropTypes.shape().isRequired,
};

function mapStateToProps(state) {
  return {
    firebaseAuth: state.firebase.auth,
    game: state.firebase.data.game,
  };
}

const gameRecord = compose(
  firebaseConnect((props, store) => {
    const { firebase: { auth } } = store.getState();
    // be careful, listeners are not re-attached when auth state changes unless props change
    return [{
      path: '/game',
      queryParams: [
        'orderByChild=userUid',
        `equalTo=${auth.uid || ''}`,
      ],
    }];
  }),
  connect(mapStateToProps),
)(GameRecord);

export default withRouter(gameRecord);
