import React from 'react';
import { withRouter } from 'react-router-dom';
import { I18n } from 'react-i18next';

import { ThreeButtonSelection } from '../common/';
import DialogSelection from './DialogSelection';

class SelectInterface extends React.Component {
  constructor(props) {
    super(props);
    this.state = { open: false };
  }
  render() {
    return (
      <I18n>
        {
          t => (
            <div>
              <ThreeButtonSelection
                header={t('interface.title')}
                secondary={false}
                first={t('interface.material')}
                second={t('interface.elder_friendly')}
                third={t('interface.random')}
                clickHandler={(select) => {
                  switch (select) {
                    case t('interface.material'):
                      this.setState({ open: true });
                      break;
                    case t('interface.elder_friendly'):
                      this.props.history.push({
                        pathname: '/SelectStart',
                        state: {
                          gameKey: this.props.location.state.gameKey,
                        },
                      });
                      break;
                    case t('interface.random'):
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
          )
        }
      </I18n>
    );
  }
}

SelectInterface.propTypes = {
  history: React.PropTypes.shape().isRequired,
  location: React.PropTypes.shape().isRequired,
};

export default withRouter(SelectInterface);
