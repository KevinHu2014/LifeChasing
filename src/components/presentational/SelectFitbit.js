import React from 'react';
import { withRouter } from 'react-router-dom';
import { I18n } from 'react-i18next';

import { ThreeButtonSelection } from '../common/';
import { HeatMapRecord } from '../containers';

const SelectFitbit = props => (
  <I18n>
    {
      t => (
        <HeatMapRecord
          page="SelectFitbit"
          light={props.location.state.light}
          gameKey={props.location.state.gameKey}
        >
          <ThreeButtonSelection
            header={t('fitbit.title')}
            secondary={false}
            first={t('fitbit.none')}
            second={t('fitbit.blue')}
            third={t('fitbit.black')}
            clickHandler={(a) => {
              props.history.push({
                pathname: '/MarkerCreator',
                state: {
                  light: props.location.state.light,
                  gameKey: props.location.state.gameKey,
                  start: props.location.state.start,
                  end: props.location.state.end,
                  mode: props.location.state.mode,
                  theInterface: '高齡友善',
                  fitbit: a,
                },
              });
            }}
          />
        </HeatMapRecord>
      )
    }
  </I18n>
);

SelectFitbit.propTypes = {
  history: React.PropTypes.shape().isRequired,
  location: React.PropTypes.shape().isRequired,
};

export default withRouter(SelectFitbit);
