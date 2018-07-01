import React, { Component, PropTypes } from 'react';
// import List from 'material-ui/List';
import List, { ListItem, ListItemText } from 'material-ui/List';
import Avatar from 'material-ui/Avatar';
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firebaseConnect, isLoaded } from 'react-redux-firebase';
import { LinearProgress } from 'material-ui/Progress';
import { I18n } from 'react-i18next';

import { BackAppBar } from '../common';

class GameRecord extends Component {
  renderListItem() {
    if (isLoaded(this.props.game)) {
      /**
       將原本的 object key 寫進陣列
       this.props.game <- object
       {
         Lqwer123: {
           startTime: 111111,
           expectTimeCost: 1113333,
           .....
         },
         Lqwer456: {
           startTime: 111111,
           expectTimeCost: 1113333,
           .....
         },
         Lqwer789: {
           startTime: 111111,
           expectTimeCost: 1113333,
           .....
         },
       }
       改寫後
       gameItem <- 仍然是 object

       {
         Lqwer123: {
           key: 'Lqwer123',
           startTime: 111111,
           expectTimeCost: 1113333,
           .....
         },
         Lqwer456: {
           key: 'Lqwer456',
           startTime: 111111,
           expectTimeCost: 1113333,
           .....
         },
         Lqwer789: {
           key: 'Lqwer789',
           startTime: 111111,
           expectTimeCost: 1113333,
           .....
         },
       }
       */
      const gameItem = Object.keys(this.props.game).map(i => (
        Object.assign(this.props.game[i], { key: i })
      ));
      // console.log(typeof (gameItem));
      return (
        <List>
          {
            Object.values(gameItem).map((item) => {
              if (item.mode !== undefined) {
                console.log(item.key);
                const date = new Date();
                date.setTime(item.startTime);
                // millisecond -> minute
                const costMinute = Math.round(item.timeSpent / 1000 / 60);
                return (
                  <ListItem
                    key={item.key}
                    divider
                    onClick={() => {
                      this.props.history.push({
                        pathname: '/GameSegment',
                        state: { key: item.key },
                      });
                    }}
                  >
                    <Avatar>
                      {item.mode[0]}
                    </Avatar>
                    <ListItemText
                      primary={`${costMinute} Min`}
                      secondary={date.toDateString()}
                    />
                  </ListItem>
                );
              }
              return true;
            })
          }
        </List>
      );
    }
    return (<LinearProgress value={10} />);
  }
  render() {
    return (
      <I18n>
        {
          t => (
            <div>
              <BackAppBar
                title={t('gameRecord.title')}
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
          )
        }
      </I18n>
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
