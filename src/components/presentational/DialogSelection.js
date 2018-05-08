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

class DialogSelection extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      start: '',
      end: '',
      mode: '',
      fitbit: '',
    };
  }
  render() {
    return (
      <div>
        <Dialog open={this.props.open}>
          <DialogTitle>遊戲選項</DialogTitle>
          <DialogContent
            classes={{
              root: this.props.classes.root,
            }}
          >
            <DialogSelectionItem
              heading="起點"
              content={['捷運站', '聖言樓', '側門']}
              onSelect={(val) => { this.setState({ start: val }); }}
            />
            <DialogSelectionItem
              heading="終點"
              content={['國璽樓', '輔園', '中美堂']}
              onSelect={(val) => { this.setState({ end: val }); }}
            />
            <DialogSelectionItem
              heading="模式"
              content={['全自動', '半自動', '手動']}
              onSelect={(val) => { this.setState({ mode: val }); }}
            />
            <DialogSelectionItem
              heading="手環"
              content={['無', '藍色', '黑色']}
              onSelect={(val) => { this.setState({ fitbit: val }); }}
            />
          </DialogContent>
          <Divider />
          <DialogActions>
            <Button onClick={() => { this.props.deny(); }} color="primary" autoFocus>
              Cancel
            </Button>
            <Button
              onClick={() => {
                const {
                 start, end, mode, fitbit,
                } = this.state;
                this.props.apply(start, end, mode, fitbit);
              }}
              color="primary"
              autoFocus
            >
              Ok
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

DialogSelection.propTypes = {
  classes: PropTypes.shape().isRequired,
  apply: PropTypes.func.isRequired,
  deny: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
};


export default withStyles(styles, { withTheme: true }, { withMobileDialog: true })(DialogSelection);
