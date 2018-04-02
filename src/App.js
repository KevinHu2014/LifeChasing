import React from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import ReduxPromise from 'redux-promise';
import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import { createLogger } from 'redux-logger';
import './index.css';
import Main from './containers/Map';
import GameRecord from './components/common/GameRecord';
import SelectStart from './components/SelectStart';
import SelectEnd from './components/SelectEnd';
import SelectMode from './components/SelectMode';
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
      <BrowserRouter>
        <div>
          <Switch>
            <Route path="/SelectStart" component={SelectStart} />
            <Route path="/SelectEnd" component={SelectEnd} />
            <Route path="/SelectMode" component={SelectMode} />
            <Route path="/GameRecord" component={GameRecord} />
            <Route path="/" component={Main} />
          </Switch>
        </div>
      </BrowserRouter>
    </MuiThemeProvider>
  </Provider>
);

export default App;
