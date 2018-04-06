import React, { PropTypes } from 'react';
import Button from 'material-ui/Button';
import Dialog, {
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  withMobileDialog,
} from 'material-ui/Dialog';


// eslint-disable-next-line prefer-stateless-function
class MapDialog extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: true,
    };
  }
  handleClose() {
    this.setState({ open: false });
  }

  render() {
    return (
      <Dialog open={this.state.open || this.props.open}>
        <DialogTitle>開始遊戲</DialogTitle>
        <DialogContent>
          <DialogContentText>
              遊戲即將開始，點擊OK鍵後請鎖定手機
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => { this.handleClose(); }} color="primary" autoFocus>
              Ok
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}

MapDialog.propTypes = {
  open: PropTypes.bool.isRequired,
};

export default withMobileDialog()(MapDialog);
