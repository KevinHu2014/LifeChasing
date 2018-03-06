import React, { Component } from 'react';
import BackAppBar from './BackAppBar';

class GameSegment extends Component {
  constructor(props) {
    super(props);
    this.state = { };
  }
  render() {
    return (
      <div>
        <BackAppBar title="Title Text" />
      </div>
    );
  }
}

export default GameSegment;
