import { combineReducers } from 'redux';
import eatBeans from './eatBeans';
import getPoints from './getPoints';
import fetchMarkers from './fetchMarkers';

const rootReducer = combineReducers({
  beans: eatBeans,
  points: getPoints,
  markers: fetchMarkers,
});

export default rootReducer;
