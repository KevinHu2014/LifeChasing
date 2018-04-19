import { combineReducers } from 'redux';
import { firebaseReducer } from 'react-redux-firebase';

import beanMap from './reducer_beanMap';
import auth from './reducer_auth';

const rootReducer = combineReducers({
  beanMap,
  firebase: firebaseReducer,
  auth,
});

export default rootReducer;
