import { combineReducers } from 'redux';
import { firebaseReducer } from 'react-redux-firebase';

import beanMap from './reducer_beanMap';

const rootReducer = combineReducers({
  beanMap,
  firebase: firebaseReducer,
});

export default rootReducer;
