import { configureStore } from '@reduxjs/toolkit';
import openWeatherReducer from './weatherSlice';
import weatherBitReducer from './weatherBitSlice';

const store = configureStore({
  reducer: {
    openWeather: openWeatherReducer,
    weatherBit: weatherBitReducer,
  },
});
export default store;
