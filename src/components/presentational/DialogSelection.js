import React, { PropTypes } from 'react';
import Dialog, {
  DialogActions,
  DialogTitle,
  DialogContent,
} from 'material-ui/Dialog';
import Button from 'material-ui/Button';
import Divider from 'material-ui/Divider';
import { withStyles } from 'material-ui/styles';

import { DialogSelectionItem } from '../common';

const styles = () => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    width: 200,
    height: 200,
    overflowY: 'scroll',
  },
});

const DialogSelection = props => (
  <div>
    <Dialog open>
      <DialogTitle>遊戲選項</DialogTitle>
      <DialogContent
        classes={{
          root: props.classes.root,
        }}
      >
        <DialogSelectionItem heading="起點" content={['捷運站', '聖言樓', '側門']} />
        <DialogSelectionItem heading="終點" content={['國璽樓', '輔園', '中美堂']} />
        <DialogSelectionItem heading="模式" content={['全自動', '半自動', '手動']} />
        <DialogSelectionItem heading="手環" content={['無', '藍色', '黑色']} />
      </DialogContent>
      <Divider />
      <DialogActions>
        <Button onClick={() => { console.log('closed!'); }} color="primary" autoFocus>
          Cancel
        </Button>
        <Button onClick={() => { console.log('closed!'); }} color="primary" autoFocus>
          Ok
        </Button>
      </DialogActions>
    </Dialog>
  </div>
);

DialogSelection.propTypes = {
  classes: PropTypes.shape().isRequired,
};


export default withStyles(styles, { withTheme: true }, { withMobileDialog: true })(DialogSelection);
