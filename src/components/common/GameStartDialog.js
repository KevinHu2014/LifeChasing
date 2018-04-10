import React, { PropTypes } from 'react';
import { DialogContent, DialogContentText } from 'material-ui/Dialog';

const GameStartDialog = props => (
  <DialogContent>
    <DialogContentText>
      {(props.mode === '全自動') ? '遊戲即將開始，點擊OK鍵後請鎖定手機'
                                  : '遊戲即將開始，點擊OK鍵後即開始遊戲'}
    </DialogContentText>
  </DialogContent>
);

GameStartDialog.propTypes = {
  mode: PropTypes.string.isRequired,
};

export default GameStartDialog;
