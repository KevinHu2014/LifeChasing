import React from 'react';
import { withRouter } from 'react-router-dom';
import { I18n } from 'react-i18next';

import { ThreeButtonSelection } from '../common/';
import { HeatMapRecord } from '../containers';

const SelectEnd = props => (
  <I18n>
    {
      t => (
        <HeatMapRecord
          page="SelectEnd"
          light={props.location.state.light}
          gameKey={props.location.state.gameKey}
        >
          <ThreeButtonSelection
            header={t('end.title')}
            secondary
            first={t('end.hopital')}
            second={t('end.cafeteria')}
            third={t('end.auditorium')}
            clickHandler={(a) => {
              if (a === t('end.hopital')) {
                props.history.push({
                  pathname: '/SelectMode',
                  state: {
                    light: props.location.state.light,
                    gameKey: props.location.state.gameKey,
                    start: props.location.state.start,
                    end: { lat: 25.038491, lon: 121.431402 },
                  },
                });
              }
            }}
          />
        </HeatMapRecord>
      )
    }
  </I18n>
);

SelectEnd.propTypes = {
  history: React.PropTypes.shape().isRequired,
  location: React.PropTypes.shape().isRequired,
};

export default withRouter(SelectEnd);
