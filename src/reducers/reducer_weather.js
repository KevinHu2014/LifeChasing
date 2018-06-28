import { GET_WEATHER_SUCCESS } from '../actions/type';

const INITAL_STATE = {
  sunrise: null,
  sunset: null,
  weatherID: null,
  light: null,
  loading: true,
};

const weather = (state = INITAL_STATE, action) => {
  switch (action.type) {
    case GET_WEATHER_SUCCESS: {
      // Check Weather Codition
      let light = false; // 預設要調暗螢幕亮度
      // 介於日出到日落之間
      if (action.time > action.sunrise && action.time < action.sunset) {
        /*
         weather condition 可以參考下列網址
         https://openweathermap.org/weather-conditions

         大部份的天氣情況都是需要調暗螢幕亮度的
        */
        switch (action.weatherID.toString()) {
          case '800':
            // clear sky
            light = true;
            break;
          case '801':
            // few clouds
            light = true;
            break;
          case '802':
            // scattered clouds
            light = true;
            break;
          default:
            // other weather coditions
            light = false;
            break;
        }
      }
      // else ->  直接調低螢幕亮度
      return {
        ...state,
        sunrise: action.sunrise,
        sunset: action.sunset,
        weatherID: action.weatherID,
        light,
        loading: false,
      };
    }
    default:
      return state;
  }
};

export default weather;
