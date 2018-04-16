import React, { Component } from 'react';
import { firebaseConnect } from 'react-redux-firebase';
import Paper from 'material-ui/Paper';
import Typography from 'material-ui/Typography';
import Hidden from 'material-ui/Hidden';
import IconButton from 'material-ui/IconButton';
import Input, { InputLabel, InputAdornment } from 'material-ui/Input';
import { FormControl } from 'material-ui/Form';

import Visibility from 'mdi-material-ui/Eye';
import VisibilityOff from 'mdi-material-ui/EyeOff';

import './SignUp.css';

// eslint-disable-next-line react/prefer-stateless-function
class SignUp extends Component {
  constructor() {
    super();
    this.state = { showPassword: false };
  }
  render() {
    return (
      <div className="Container">
        <Hidden smDown>
          <Paper className="Background">
            <Typography variant="display1" style={{ color: '#fff' }}>
                Semi automation
            </Typography>
          </Paper>
        </Hidden>
        <Paper className="Form">
          <FormControl>
            <InputLabel htmlFor="adornment-password">Password</InputLabel>
            <Input
              id="adornment-password"
              type={this.state.showPassword ? 'text' : 'password'}
              value={this.state.password}
              onChange={(event) => {
                this.setState({ password: event.target.value });
              }}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="Toggle password visibility"
                    onClick={() => {
                      this.setState({ showPassword: !this.state.showPassword });
                    }}
                    onMouseDown={(event) => { event.preventDefault(); }}
                  >
                    {this.state.showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
            />
          </FormControl>
        </Paper>
      </div>
    );
  }
}


export default firebaseConnect()(SignUp);
