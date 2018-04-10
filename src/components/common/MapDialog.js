import React, { PropTypes } from 'react';
import Button from 'material-ui/Button';
import Dialog, {
  DialogActions,
  DialogTitle,
  withMobileDialog,
} from 'material-ui/Dialog';


const MapDialog = props => (
  <Dialog open={props.open}>
    <DialogTitle>{props.title}</DialogTitle>
    {props.children}
    <DialogActions>
      <Button onClick={() => { props.onClose(); }} color="primary" autoFocus>
        {props.buttonText}
      </Button>
    </DialogActions>
  </Dialog>
);

MapDialog.propTypes = {
  title: PropTypes.string.isRequired,
  buttonText: PropTypes.string.isRequired,
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
};

export default withMobileDialog()(MapDialog);
