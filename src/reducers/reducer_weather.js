import { GET_WEATHER_SUCCESS } from '../actions/type';

const INITAL_STATE = {
  sunrise: null,
  sunset: null,
  weatherID: null,
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
    default:
      return state;
  }
};

export default weather;
