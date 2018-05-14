import React, { Component, PropTypes } from 'react';
import List, { ListItem, ListItemText } from 'material-ui/List';
import Avatar from 'material-ui/Avatar';
import Divider from 'material-ui/Divider';
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firebaseConnect, isLoaded, isEmpty } from 'react-redux-firebase';

import { BackAppBar } from '../common';

class GameRecord extends Component {
  constructor(props) {
    super(props);
    this.state = { };
  }
  componentDidMount() {
    if (!isLoaded(this.props.game)) {
      console.log(this.props.game);
    }
    if (isEmpty(this.props.game)) {
      console.log('empty');
    }
  }
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
                  <ListItem>
                    <Avatar>
                      {item.mode[0]}
                    </Avatar>
                    <ListItemText
                      primary={`${costMinute} Min`}
                      secondary={date.toDateString()}
                    />
                  </ListItem>
                  <Divider />
                </div>
              );
            })
          }
        </List>
      );
    }
    return (<div />);
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
