import { GET_POINTS } from '../actions/index';

// State argument is not application state, only the state
// this reducer is responsible for

const getPoints = (state = 0, action) => {
  switch (action.type) {
    case GET_POINTS:
      return action.score;
    default:
      return state;
  }
};

export default getPoints;
