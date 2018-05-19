import axios from 'axios';
import {
  FETCH_WEATHER,
  GET_WEATHER_SUCCESS,
  GET_WEATHER_FAIL,
  CHECK_WEATHER_CONDITION,
} from './type';

import setting from '../setting';

const getWeatherSuccess = (dispatch, response) => {
  dispatch({
    type: GET_WEATHER_SUCCESS,
    payload: response,
  });
};

export const getWeatherFail = (dispatch, err) => {
  dispatch({
    type: GET_WEATHER_FAIL,
    payload: err,
  });
};

export const fetchWeather = (latitude, longitude) => async (dispatch) => {
  dispatch({ type: FETCH_WEATHER });
  const url = `http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&APPID=${setting.weatherAPIKey}`;
  axios.get(url)
    .then((response) => {
      console.log(response.data);
      getWeatherSuccess(dispatch, response.data);
    })
    .catch((err) => { getWeatherFail(dispatch, err); });
};

export const checkWeatherCondition = time => ({
  type: CHECK_WEATHER_CONDITION,
  payload: time,
});