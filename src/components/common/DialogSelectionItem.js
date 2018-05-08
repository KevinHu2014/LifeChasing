import React, { PropTypes } from 'react';
import { InputLabel } from 'material-ui/Input';
import { MenuItem } from 'material-ui/Menu';
import { FormControl } from 'material-ui/Form';
import Select from 'material-ui/Select';
import { withStyles } from 'material-ui/styles';

const styles = theme => ({
  formControl: {
    marginTop: theme.spacing.unit,
    marginBottom: theme.spacing.unit,
    minWidth: 180,
    minHeight: 50,
  },
});

class DialogSelectionItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = { val: '' };
  }
  render() {
    const { classes, heading, content } = this.props;
    return (
      <FormControl
        classes={{
          root: classes.formControl,
        }}
      >
        <InputLabel htmlFor={heading}>{heading}</InputLabel>
        <Select
          value={this.state.val}
          onChange={(event) => {
            this.setState({ val: event.target.value });
            this.props.onSelect(event.target.value);
          }}
          inputProps={{
            name: heading,
            id: heading,
          }}
        >
          {content.map(item => (<MenuItem key={item} value={item}>{item}</MenuItem>))}
        </Select>
      </FormControl>
    );
  }
}


DialogSelectionItem.propTypes = {
  classes: PropTypes.shape().isRequired,
  heading: PropTypes.string.isRequired,
  onSelect: PropTypes.func.isRequired,
  content: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
};

export default withStyles(styles, { withTheme: true })(DialogSelectionItem);
