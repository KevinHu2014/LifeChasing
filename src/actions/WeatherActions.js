import axios from 'axios';
import {
  FETCH_WEATHER,
  GET_WEATHER_SUCCESS,
  GET_WEATHER_FAIL,
} from './type';

import setting from '../setting';

const getWeatherSuccess = (dispatch, response) => {
  /*
   openweather api 的 sunrise 和 sunset 單位是用秒 ！！！
   但一般 JS 的 getTime 是 milliseconds !!
   所以 sunrise 跟 sunset 要再乘上 1000
  */
  dispatch({
    type: GET_WEATHER_SUCCESS,
    sunrise: response.sys.sunrise * 1000,
    sunset: response.sys.sunset * 1000,
    weatherID: response.weather[0].id,
    time: new Date().getTime(),
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
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&APPID=${setting.weatherAPIKey}`;
  axios.get(url)
    .then((response) => {
      console.log(response.data);
      getWeatherSuccess(dispatch, response.data);
    })
    .catch((err) => { getWeatherFail(dispatch, err); });
};
