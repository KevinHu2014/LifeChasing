import {
  EAT_BEANS,
  IMPORT_MARKERS,
  INIT_POSITION,
  SET_TIMER,
  TIME_OUT,
  CAL_SPEED,
  GAME_DIALOG,
  GAME_END,
  GHOST_POSITION,
} from './type';

export function eatBeans(latitude, longitude) {
  // eatBeans is an ActionCreator, it needs to return an action,
  // an object with a type property.
  return {
    type: EAT_BEANS,
    latitude,
    longitude,
  };
}

export function importMarkers(marker) {
  return {
    type: IMPORT_MARKERS,
    payload: marker,
  };
}

export function initPosition(latitude, longitude) {
  return {
    type: INIT_POSITION,
    latitude,
    longitude,
  };
}

export function setTimer(minutes) {
  return {
    type: SET_TIMER,
    payload: minutes,
  };
}

export function timeOut() {
  return {
    type: TIME_OUT,
    payload: true,
  };
}

export function ghostPosition(position) {
  // position is an object contains latitude & longitude & caught
  return {
    type: GHOST_POSITION,
    payload: position,
  };
}

export function checkTimeOut(flag) {
  /*
    current is set after SET_TIMER
    so current might be larger
    if the alarm is larger, it means the alarm
    time must have been update
  */
  return (dispatch, getState) => {
    console.log(getState().beanMap);
    if (flag) { // when flag is true means current time >= alarm time
      dispatch(timeOut());
      let i = 0; // counter
      const times = 10; // how many times for ghost to appear before it hit user
      const seconds = 1; // by modifying the time to make the game harder
      const dist = 0.0001; // how far away does the ghost start to appear
      const lat = getState().beanMap.latitude;
      const lon = getState().beanMap.longitude;
      const timerID = setInterval(() => {
        const move = i * dist * (1 / times);
        console.log(move);
        console.log(i);
        if (i > times) {
          clearInterval(timerID); // The setInterval it cleared and doesn't run anymore.
        } else if (getState().beanMap.ghost) {
          if (i === times) {
            dispatch(ghostPosition({
              latitude: (lat - dist) + move,
              longitude: (lon + dist) - move,
              caught: true,
            }));
          } else {
            dispatch(ghostPosition({
              latitude: (lat - dist) + move,
              longitude: (lon + dist) - move,
              caught: false,
            }));
          }
        }
        i += 1;
      }, 1000 * seconds);
    }
  };
}

export function calSpeed(latitude, longitude, currentTime) {
  return {
    type: CAL_SPEED,
    latitude,
    longitude,
    currentTime,
  };
}

export function gameDialog(dialogType, flag) {
  return {
    type: GAME_DIALOG,
    dialogType,
    flag,
  };
}

export function gameEnd(totalBeans, expectTimeCost, expectDistance, w1, w2, sd, currentTime) {
  return {
    type: GAME_END,
    totalBeans,
    expectTimeCost,
    expectDistance,
    w1,
    w2,
    sd,
    currentTime,
  };
}
