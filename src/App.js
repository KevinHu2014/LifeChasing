import React from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import ReduxPromise from 'redux-promise';
import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { reactReduxFirebase } from 'react-redux-firebase';
import firebase from 'firebase';
import { createLogger } from 'redux-logger';

import './index.css';
import MainMap from './containers/Map';
import { GameRecord } from './components/common/';
import SelectStart from './components/SelectStart';
import SelectEnd from './components/SelectEnd';
import SelectMode from './components/SelectMode';
import SignUp from './containers/SignUp';
import reducers from './reducers';
import firebaseConfig from './firebaseConfig';

// react-redux-firebase options
const config = {
  userProfile: 'users', // firebase root where user profiles are stored
  enableLogging: true, // enable/disable Firebase's database logging
};

// initialize firebase instance
firebase.initializeApp(firebaseConfig);

const logger = createLogger();
const store = createStore(
  reducers,
  compose(
    reactReduxFirebase(firebase, config),
    applyMiddleware(ReduxPromise, logger),
  ),
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
            <Route path="/SignUp" component={SignUp} />
            <Route path="/SelectStart" component={SelectStart} />
            <Route path="/SelectEnd" component={SelectEnd} />
            <Route path="/SelectMode" component={SelectMode} />
            <Route path="/GameRecord" component={GameRecord} />
            <Route path="/Map" component={MainMap} />
            <Route path="/" component={SelectStart} />
          </Switch>
        </div>
      </BrowserRouter>
    </MuiThemeProvider>
  </Provider>
);

export default App;
