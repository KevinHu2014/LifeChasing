import {
  EAT_BEANS,
  IMPORT_MARKERS,
  INIT_POSITION,
  SET_TIMER,
  TIME_OUT,
  CAL_SPEED,
  GAME_DIALOG,
  GAME_END,
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

export function checkTimeOut(current) {
  /*
    current is set after SET_TIMER
    so current might be larger
    if the alarm is larger, it means the alarm
    time must have been update
  */
  return (dispatch, getState) => {
    console.log(getState().beanMap);
    if (current >= getState().beanMap.alarm) {
      dispatch(timeOut());
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
