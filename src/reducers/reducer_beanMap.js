import {
  FETCH_MARKERS,
  INIT_POSITION,
  EAT_BEANS,
  SET_TIMER,
  TIME_OUT,
  CAL_SPEED,
  GAME_DIALOG,
  GAME_END,
} from '../actions/type';
import Distance from '../Distance';

const initialState = {
  gameStartDialog: true,
  gamePauseDialog: false,
  gameEndDialog: false,
  score: 0,
  gameScore: 0,
  sportScore: 0,
  alarm: new Date().getTime(),
  markers: [],
  ghost: false,
  ghostCounter: 0,
  maxSpeed: 0,
  avgSpeed: 0,
  distance: 0, // Km
  latitude: 0,
  longitude: 0,
  startTime: new Date().getTime(),
  lastUpdateTime: new Date().getTime(),
  totalTime: 0,
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
          let dist = Distance(bean.latitude, bean.longitude, action.latitude, action.longitude, 'K');
          dist = Math.round(dist * 1000) / 1000; // 四捨五入
          dist *= 1000; // 1 Km = 1000m
          if (dist >= 5) {
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
          if the state.alarm is larger, it means the alarm
          time must have been update
        */
      if (action.payload >= state.alarm) {
        return Object.assign({}, state, {
          ghost: true,
          ghostCounter: state.ghostCounter + 1,
        });
      }
      return state;
    }
    case CAL_SPEED: {
      /*
       There's a bug that accurs sometimes when it the same loaction, the distance isn't zero.
       It will return 0.00009493073054631141.
       according to this site https://www.movable-type.co.uk/scripts/latlong.html?
       rounding to 4 significant figures reflects the approx. 0.3% accuracy of the spherical model
       */
      let dist = Distance(state.latitude, state.longitude, action.latitude, action.longitude, 'K');
      dist = Math.round(dist * 1000) / 1000;
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
    case GAME_DIALOG: {
      switch (action.dialogType) {
        case 'start':
          return Object.assign({}, state, {
            gameStartDialog: action.flag,
          });
        case 'pause':
          return Object.assign({}, state, {
            gamePauseDialog: action.flag,
          });
        case 'end':
          return Object.assign({}, state, {
            gameEndDialog: action.flag,
          });
        default:
          return state;
      }
    }
    case GAME_END: {
      // (totalBeans, expectTimeCost, expectDistance, w1, w2, sd)
      const {
        score, ghostCounter, avgSpeed, distance,
      } = state;
      const {
        totalBeans, expectTimeCost, expectDistance, w1, w2, sd, currentTime,
      } = action;
      const totalTime = (currentTime - state.startTime);
      /**
        Game Score
        (((Bm * W1) - (C * W2)) / (Bt * W1))*(Ta / Tt)*100;
        Bm: Number of fairy balls eaten
        C: Number of times being caught by monster
        Tt: Time used of this game segment
        Bt: Total number of fairy balls on the map
        Ta: Expected time spent
        Wi: Weight
      */
      let gameScore = (((score * w1) - (ghostCounter * w2)) / (totalBeans * w1)) *
        (expectTimeCost / totalTime) * 100;
      gameScore = Math.round(gameScore * 1000) / 1000; // 四捨五入
      /**
        Sport Score
        No Fitbit
        (Sa / Sd) * (de / dt) *100;
        Sa: Average speed of this game segment
        de: Actual movement distance
        Sd: Default exercise speed (to have full exercise experience) dt: Expected movement distance

        With Fitbit
        (Sa / Sd) * (de / dt) * (Hm / Ha) *100;
        Sa: Average speed of this game segment
        de: Actual movement distance
        Sd: Default exercise speed (to have full exercise experience) dt: Expected movement distance
        Hm: Highest heart rate of this game segment
        Ha: Daily average heart rate
       */
      let sportScore = (avgSpeed / sd) * (distance / expectDistance) * 100;
      sportScore = Math.round(sportScore * 1000) / 1000; // 四捨五入

      return Object.assign({}, state, {
        gameScore,
        sportScore,
        gameEndDialog: true,
        totalTime,
      });
    }
    default:
      return state;
  }
};

export default beanMap;
