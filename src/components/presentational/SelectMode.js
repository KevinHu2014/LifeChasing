import React from 'react';
import { withRouter } from 'react-router-dom';
import { I18n } from 'react-i18next';

import { ThreeButtonSelection } from '../common/';
import { HeatMapRecord } from '../containers';

const SelectMode = props => (
  <I18n>
    {
      t => (
        <HeatMapRecord page="SelectMode" gameKey={props.location.state.gameKey}>
          <ThreeButtonSelection
            header={t('mode.title')}
            secondary={false}
            first={t('mode.full')}
            second={t('mode.semi')}
            third={t('mode.manual')}
            clickHandler={(a) => {
              props.history.push({
                pathname: '/SelectFitbit',
                state: {
                  gameKey: props.location.state.gameKey,
                  start: props.location.state.start,
                  end: props.location.state.end,
                  mode: a,
                },
              });
            }}
          />
        </HeatMapRecord>
      )
    }
  </I18n>
);

SelectMode.propTypes = {
  history: React.PropTypes.shape().isRequired,
  location: React.PropTypes.shape().isRequired,
};

export default withRouter(SelectMode);
