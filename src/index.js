import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Main from './App';
// import Main from './components/Map';
import registerServiceWorker from './registerServiceWorker';

const App = () => (
    <MuiThemeProvider>
      <Main />
    </MuiThemeProvider>
);

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
