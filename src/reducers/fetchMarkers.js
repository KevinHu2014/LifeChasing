import { FETCH_MARKERS } from '../actions/index';

const fetchMarkers = (state = [], action) => {
  switch (action.type) {
    case FETCH_MARKERS:
      return action.payload.data.Dots;
    default:
      return state;
  }
};

export default fetchMarkers;
