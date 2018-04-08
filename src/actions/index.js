import axios from 'axios';

const url = [
  // Length issue
  'https://gist.githubusercontent.com',
  '/KevinHu2014/80f0dfe62528601a9ac0634c8379bee4',
  '/raw/56bd6ee4e2a86a06f8c8bb83a93807a3df3cd67e/ReactDot.json',
].join(''); // Marker url

export const EAT_BEANS = 'EAT_BEANS';
export const FETCH_MARKERS = 'FETCH_MARKERS';
export const SET_TIMER = 'SET_TIMER';
export const TIME_OUT = 'TIME_OUT';

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

export function setTimer(minutes) {
  return {
    type: SET_TIMER,
    payload: minutes,
  };
}

export function timeOut(current) {
  return {
    type: TIME_OUT,
    payload: current,
  };
}
