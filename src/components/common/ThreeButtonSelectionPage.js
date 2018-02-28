import React, { Component } from 'react';
import RaisedButton from 'material-ui/RaisedButton';

class ThreeButtonSelectionPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      text: '測試',
    };
  }

  render() {
    return (
      <div
        className="App"
        style={{
          display: 'flex',
          flex: 1,
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <RaisedButton label={this.state.text} />
        <RaisedButton label={this.state.text} />
        <RaisedButton label={this.state.text} />
      </div>
    );
  }
}

export default ThreeButtonSelectionPage;
