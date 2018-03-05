import React from 'react';
import ReactDOM from 'react-dom';
import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles';
import blue from 'material-ui/colors/blue';
import './index.css';
import Main from './App';
// import Main from './components/Map';
import registerServiceWorker from './registerServiceWorker';


const theme = createMuiTheme({
  palette: {
    primary: blue,
  },
});

const App = () => (
  <MuiThemeProvider theme={theme}>
    <Main />
  </MuiThemeProvider>
);

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
