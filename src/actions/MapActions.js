import axios from 'axios';
import {
  EAT_BEANS,
  FETCH_MARKERS,
  INIT_POSITION,
  SET_TIMER,
  TIME_OUT,
  CAL_SPEED,
  GAME_DIALOG,
  GAME_END,
} from './type';

const url = [
  // Length issue
  'https://gist.githubusercontent.com',
  '/KevinHu2014/80f0dfe62528601a9ac0634c8379bee4',
  '/raw/56bd6ee4e2a86a06f8c8bb83a93807a3df3cd67e/ReactDot.json',
].join(''); // Marker url

export function eatBeans(latitude, longitude) {
  // eatBeans is an ActionCreator, it needs to return an action,
  // an object with a type property.
  return {
    type: EAT_BEANS,
    latitude,
    longitude,
  };
}

export function fetchMarkers() {
  const request = axios.get(url);
  return {
    type: FETCH_MARKERS,
    payload: request,
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

export function timeOut(current, alarm) {
  /*
    current is set after SET_TIMER
    so current might be larger
    if the alarm is larger, it means the alarm
    time must have been update
  */
  if (current >= alarm) {
    return {
      type: TIME_OUT,
      payload: true,
    };
  }
  return {
    type: TIME_OUT,
    payload: false,
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
