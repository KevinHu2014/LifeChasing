import { FETCH_MARKERS, GET_POINTS } from '../actions/index';

const initialState = {
  score: 0,
  markers: [],
};

// State argument is not application state, only the state
// this reducer is responsible for

const beanMap = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_MARKERS:
      return Object.assign({}, state, {
        markers: action.payload.data.Dots,
      });
    case GET_POINTS:
      return Object.assign({}, state, {
        score: action.score,
      });
    default:
      return state;
  }
};

export default beanMap;
