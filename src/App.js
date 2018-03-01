import React, { Component } from 'react';
import ThreeButtonSelectionPage from './components/common/ThreeButtonSelectionPage';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      test: 'App',
    };
  }

  render() {
    return (
      <div className={this.state.test}>
        <ThreeButtonSelectionPage first="捷運輔大站" second="聖言樓" third="輔大側門" />
      </div>
    );
  }
}

export default App;
