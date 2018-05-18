import { combineReducers } from 'redux';
import { firebaseReducer } from 'react-redux-firebase';

import beanMap from './reducer_beanMap';
import auth from './reducer_auth';
import weather from './reducer_weather';

const rootReducer = combineReducers({
  beanMap,
  firebase: firebaseReducer,
  auth,
  weather,
});

export default rootReducer;
