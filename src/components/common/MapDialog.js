import React from 'react';
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
      <Dialog open={this.state.open}>
        <DialogTitle>Set backup account</DialogTitle>
        <DialogContent>
          <DialogContentText>
              Let Google help apps determine location. This means sending anonymous location data to
              Google, even when no apps are running.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => { this.handleClose(); }} color="primary">
              Disagree
          </Button>
          <Button onClick={() => { this.handleClose(); }} color="primary" autoFocus>
              Agree
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}

export default withMobileDialog()(MapDialog);
