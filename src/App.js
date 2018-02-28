import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import ThreeButtonSelectionPage from './components/common/ThreeButtonSelectionPage';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      logo: 'logo',
    };
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt={this.state.logo} />
        </div>
        <ThreeButtonSelectionPage />
      </div>
    );
  }
}

export default App;
