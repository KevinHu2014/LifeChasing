import React, { PropTypes } from 'react';
import { DialogContent, DialogContentText } from 'material-ui/Dialog';
import { I18n } from 'react-i18next';

const GameStartDialog = props => (
  <I18n>
    {
      t => (
        <DialogContent>
          <DialogContentText>
            {(props.mode === t('mode.full')) ? t('dialog.fullStartContent1')
                                          : t('dialog.fullStartContent2')}
          </DialogContentText>
        </DialogContent>
        )
    }
  </I18n>
);

GameStartDialog.propTypes = {
  mode: PropTypes.string.isRequired,
};

export default GameStartDialog;
