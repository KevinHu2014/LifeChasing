import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import ReduxPromise from 'redux-promise';
import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles';
import { createLogger } from 'redux-logger';
import './index.css';
// import Main from './App';
import Main from './containers/Map';
import registerServiceWorker from './registerServiceWorker';
import reducers from './reducers';

const logger = createLogger();
const store = createStore(
  reducers,
  applyMiddleware(ReduxPromise, logger),
);

const theme = createMuiTheme({
  palette: {
    primary: {
      light: '#80e27e',
      main: '#4caf50',
      dark: '#087f23',
      contrastText: '#000',
    },
    secondary: {
      light: '#63a4ff',
      main: '#1976d2',
      dark: '#004ba0',
      contrastText: '#fff',
    },
  },
});

const App = () => (
  <Provider store={store}>
    <MuiThemeProvider theme={theme}>
      <Main />
    </MuiThemeProvider>
  </Provider>
);

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
