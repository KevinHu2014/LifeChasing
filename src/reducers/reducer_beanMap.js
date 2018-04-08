import {
  FETCH_MARKERS,
  INIT_POSITION,
  EAT_BEANS,
  SET_TIMER,
  TIME_OUT,
  CAL_SPEED,
} from '../actions/index';
import Distance from '../Distance';

const initialState = {
  score: 0,
  alarm: new Date().getTime(),
  markers: [],
  ghost: false,
  maxSpeed: 0,
  avgSpeed: 0,
  distance: 0, // Km
  latitude: 0,
  longitude: 0,
  startTime: new Date().getTime(),
  lastUpdateTime: new Date().getTime(),
};

// State argument is not application state, only the state
// this reducer is responsible for

const beanMap = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_MARKERS:
      return Object.assign({}, state, {
        markers: action.payload.data.Dots,
      });
    case INIT_POSITION:
      return Object.assign({}, state, {
        latitude: action.latitude,
        longitude: action.longitude,
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
    case SET_TIMER: {
      const now = new Date().getTime();
      /*
        getTime return the number of milliseconds since midnight January 1, 1970
        1 minute equal to 60 * 1000 milliseconds
      */
      return Object.assign({}, state, {
        alarm: (now + (1000 * 60 * action.payload)),
      });
    }
    case TIME_OUT: {
      /*
          action.payload is set after SET_TIMER
          so action.payload might be larger
          if the state.alarm, it means the alarm
          time must have been update
        */
      if (action.payload >= state.alarm) {
        return Object.assign({}, state, {
          ghost: true,
        });
      }
      return state;
    }
    case CAL_SPEED: {
      const dist = Distance(state.latitude, state.longitude, action.latitude, action.longitude, 'K');
      const time = (action.currentTime - state.lastUpdateTime) * 1000 * 60 * 60;
      const totalTime = (action.currentTime - state.startTime) * 1000 * 60 * 60;
      const speed = dist / time;
      return Object.assign({}, state, {
        maxSpeed: Math.max(state.maxSpeed, speed),
        avgSpeed: (state.distance + dist) / totalTime,
        distance: (state.distance + dist),
        latitude: action.latitude,
        longitude: action.longitude,
        lastUpdateTime: action.currentTime,
      });
    }
    default:
      return state;
  }
};

export default beanMap;
