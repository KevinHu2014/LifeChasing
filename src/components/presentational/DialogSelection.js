import React, { PropTypes } from 'react';
import Dialog, {
  DialogActions,
  DialogTitle,
  DialogContent,
} from 'material-ui/Dialog';
import Button from 'material-ui/Button';
import { InputLabel } from 'material-ui/Input';
import { MenuItem } from 'material-ui/Menu';
import { FormControl } from 'material-ui/Form';
import Select from 'material-ui/Select';
import { withStyles } from 'material-ui/styles';

const styles = theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    width: 200,
    height: 260,
    // overflow: 'scroll',
  },
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 150,
    minHeight: 60,
  },
});

const DialogSelection = props => (
  <div>
    <Dialog open autoScrollBodyContent autoDetectWindowHeight>
      <DialogTitle>遊戲選項</DialogTitle>
      <DialogContent
        classes={{
          root: props.classes.root,
        }}
      >
        <FormControl
          classes={{
            root: props.classes.formControl,
          }}
        >
          <InputLabel htmlFor="age-simple">Age</InputLabel>
          <Select
            value=""
            onChange={(event) => { console.log(event.target.value); }}
            inputProps={{
              name: 'age',
              id: 'age-simple',
            }}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            <MenuItem value={10}>Ten</MenuItem>
            <MenuItem value={20}>Twenty</MenuItem>
            <MenuItem value={30}>Thirty</MenuItem>
          </Select>
        </FormControl>
        <FormControl
          classes={{
            root: props.classes.formControl,
          }}
        >
          <InputLabel htmlFor="age-simple">Age</InputLabel>
          <Select
            value=""
            onChange={(event) => { console.log(event.target.value); }}
            inputProps={{
              name: 'age',
              id: 'age-simple',
            }}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            <MenuItem value={10}>Ten</MenuItem>
            <MenuItem value={20}>Twenty</MenuItem>
            <MenuItem value={30}>Thirty</MenuItem>
          </Select>
        </FormControl>
        <FormControl
          classes={{
            root: props.classes.formControl,
          }}
        >
          <InputLabel htmlFor="age-simple">Age</InputLabel>
          <Select
            value=""
            onChange={(event) => { console.log(event.target.value); }}
            inputProps={{
              name: 'age',
              id: 'age-simple',
            }}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            <MenuItem value={10}>Ten</MenuItem>
            <MenuItem value={20}>Twenty</MenuItem>
            <MenuItem value={30}>Thirty</MenuItem>
          </Select>
        </FormControl>
        <FormControl
          classes={{
            root: props.classes.formControl,
          }}
        >
          <InputLabel htmlFor="age-simple">Age</InputLabel>
          <Select
            value=""
            onChange={(event) => { console.log(event.target.value); }}
            inputProps={{
              name: 'age',
              id: 'age-simple',
            }}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            <MenuItem value={10}>Ten</MenuItem>
            <MenuItem value={20}>Twenty</MenuItem>
            <MenuItem value={30}>Thirty</MenuItem>
          </Select>
        </FormControl>
        <FormControl
          classes={{
            root: props.classes.formControl,
          }}
        >
          <InputLabel htmlFor="age-simple">Age</InputLabel>
          <Select
            value=""
            onChange={(event) => { console.log(event.target.value); }}
            inputProps={{
              name: 'age',
              id: 'age-simple',
            }}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            <MenuItem value={10}>Ten</MenuItem>
            <MenuItem value={20}>Twenty</MenuItem>
            <MenuItem value={30}>Thirty</MenuItem>
          </Select>
        </FormControl>
        <FormControl
          classes={{
            root: props.classes.formControl,
          }}
        >
          <InputLabel htmlFor="age-simple">Age</InputLabel>
          <Select
            value=""
            onChange={(event) => { console.log(event.target.value); }}
            inputProps={{
              name: 'age',
              id: 'age-simple',
            }}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            <MenuItem value={10}>Ten</MenuItem>
            <MenuItem value={20}>Twenty</MenuItem>
            <MenuItem value={30}>Thirty</MenuItem>
          </Select>
        </FormControl>
      </DialogContent>
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
