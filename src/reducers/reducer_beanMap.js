import { FETCH_MARKERS, EAT_BEANS } from '../actions/index';

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
    case EAT_BEANS: {
      let Counter = 0;
      return Object.assign({}, state, {
        markers: state.markers.filter((bean) => {
          // Eat Beans
          // 0.000045-->5m , 0.000044-->5m
          if (!(Math.abs(bean.latitude - action.latitude) < 0.000045 * 5
                  && Math.abs(bean.longitude - action.longitude) < 0.000044 * 5)) {
            return bean;
          }
          Counter += 1;
          return false;
        }),
        score: (state.score + Counter),
      });
    }
    default:
      return state;
  }
};

export default beanMap;
