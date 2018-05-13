import React from 'react';
import { withRouter } from 'react-router-dom';

import { ThreeButtonSelection } from '../common/';
import DialogSelection from './DialogSelection';

class SelectInterface extends React.Component {
  constructor(props) {
    super(props);
    this.state = { open: false };
  }
  render() {
    return (
      <div>
        <ThreeButtonSelection
          header="請選擇模式"
          secondary={false}
          first="Material"
          second="高齡友善"
          third="隨機"
          clickHandler={(select) => {
            switch (select) {
              case 'Material':
                this.setState({ open: true });
                break;
              case '高齡友善':
                this.props.history.push({
                  pathname: '/SelectStart',
                  state: {
                    gameKey: this.props.location.state.gameKey,
                  },
                });
                break;
              case '隨機':
                break;
              default:
                break;
            }
          }}
        />
        <DialogSelection
          open={this.state.open}
          gameKey={this.props.location.state.gameKey}
          deny={() => {
            this.setState({ open: false });
          }}
          apply={(start, end, mode, fitbit) => {
            console.log(fitbit);
            this.setState({ open: false });
            this.props.history.push({
              pathname: '/Map',
              state: {
                theInterface: 'Material',
                gameKey: this.props.location.state.gameKey,
                start,
                end,
                mode,
              },
            });
          }}
        />
      </div>
    );
  }
}

SelectInterface.propTypes = {
  history: React.PropTypes.shape().isRequired,
  location: React.PropTypes.shape().isRequired,
};

export default withRouter(SelectInterface);
