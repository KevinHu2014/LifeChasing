import axios from 'axios';
import {
  EAT_BEANS,
  FETCH_MARKERS,
  INIT_POSITION,
  SET_TIMER,
  TIME_OUT,
  CAL_SPEED,
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

export function timeOut(current) {
  return {
    type: TIME_OUT,
    payload: current,
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
