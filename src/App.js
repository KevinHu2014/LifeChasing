import React from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import ReduxPromise from 'redux-promise';
import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { reactReduxFirebase } from 'react-redux-firebase';
import firebase from 'firebase';
import { createLogger } from 'redux-logger';

import './index.css';
import {
  GameRecord,
  GameSegment,
  SelectStart,
  SelectEnd,
  SelectMode,
  SelectFitbit,
  SelectInterface,
  DialogSelection,
} from './components/presentational';
import {
  Main,
  SignUp,
  SignIn,
  StartPage,
  PrivateRoute,
  MainMap,
} from './components/containers';
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
    applyMiddleware(ReduxPromise, thunk, logger),
  ),
);

const theme1 = createMuiTheme({
  palette: {
    primary: {
      light: '#ff71ca',
      main: '#ff3399',
      dark: '#c7006b',
      contrastText: '#ffffff',
    },
    secondary: {
      light: '#7cff98',
      main: '#33ff66',
      dark: '#00ca34',
      contrastText: '#000000',
    },
  },
});

// const theme2 = createMuiTheme({
//   palette: {
//     light: '#7e61ff',
//     main: '#3333ff',
//     dark: '#0000ca',
//     contrastText: '#ffffff',
//   },
//   secondary: {
//     primary: {
//       light: '#ffff6e',
//       main: '#ffff33',
//       dark: '#c8cc00',
//       contrastText: '#000000',
//     },
//   },
// });


const App = () => (
  <Provider store={store}>
    <MuiThemeProvider theme={theme1}>
      <BrowserRouter>
        <div>
          <Switch>
            <Route path="/StartPage" component={StartPage} />
            <Route path="/SignIn" component={SignIn} />
            <Route path="/SignUp" component={SignUp} />
            <PrivateRoute path="/Main" component={Main} />
            <Route path="/DialogSelection" component={DialogSelection} />
            <PrivateRoute path="/SelectInterface" component={SelectInterface} />
            <PrivateRoute path="/SelectStart" component={SelectStart} />
            <PrivateRoute path="/SelectEnd" component={SelectEnd} />
            <PrivateRoute path="/SelectMode" component={SelectMode} />
            <PrivateRoute path="/SelectFitbit" component={SelectFitbit} />
            <PrivateRoute path="/GameRecord" component={GameRecord} />
            <PrivateRoute path="/GameSegment" component={GameSegment} />
            <PrivateRoute path="/Map" component={MainMap} />
            <PrivateRoute path="/" component={Main} />
          </Switch>
        </div>
      </BrowserRouter>
    </MuiThemeProvider>
  </Provider>
);

export default App;
