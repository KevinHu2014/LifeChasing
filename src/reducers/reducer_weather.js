import {
  GET_WEATHER_SUCCESS,
  CHECK_WEATHER_CONDITION,
} from '../actions/type';

const INITAL_STATE = {
  sunrise: null,
  sunset: null,
  weatherID: null,
  light: null,
};

const weather = (state = INITAL_STATE, action) => {
  switch (action.type) {
    case GET_WEATHER_SUCCESS: {
      return {
        ...state,
        sunrise: action.payload.sys.sunrise,
        sunset: action.payload.sys.sunset,
        weatherID: action.payload.weather[0].id,
      };
    }
    case CHECK_WEATHER_CONDITION: {
      let light = false; // 預設要調暗螢幕亮度
      // 介於日出到日落之間
      if (action.payload > state.sunrise && action.payload < state.sunset) {
        /*
         weather condition 可以參考下列網址
         https://openweathermap.org/weather-conditions

         大部份的天氣情況都是需要調暗螢幕亮度的
        */
        switch (state.weatherID.toString()) {
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
            light = false;
            break;
        }
      }
      // else ->  直接調低螢幕亮度
      return { ...state, light };
    }
    default:
      return state;
  }
};

export default weather;
