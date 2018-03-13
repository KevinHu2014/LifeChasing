import { combineReducers } from 'redux';
import eatBeans from './eatBeans';
import getPoints from './getPoints';

const rootReducer = combineReducers({
  beans: eatBeans,
  points: getPoints,
});

export default rootReducer;
