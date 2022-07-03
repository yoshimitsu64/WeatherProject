import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const initialstate = {
  city: null,
  country: null,
  currentWeather: null,
  currentTemperature: null,
  weather7days: null,
};

const weatherBitSlice = createSlice({
  name: 'weatherBit',
  initialState: initialstate,
  reducers: {
    setGEOBit: (state, action) => {
      // eslint-disable-next-line no-param-reassign
      state.city = action.payload.results[0]?.components?.city;
      // eslint-disable-next-line no-param-reassign
      state.country = action.payload.results[0]?.components?.country;
    },
    setCurrentWeatherBit: (state, action) => {
      // eslint-disable-next-line no-param-reassign
      state.currentTemperature = action.payload.data[0]?.temp;
      // eslint-disable-next-line no-param-reassign
      state.currentWeather = action.payload.data[0]?.weather?.description;
    },
    setWeather7DaysBit: (state, action) => {
      // eslint-disable-next-line no-param-reassign
      state.weather7days = action.payload.data.filter((value, index) => index < 7);
    },
  },
});
export const { setGEOBit, setCurrentWeatherBit, setWeather7DaysBit } = weatherBitSlice.actions;
export const getLocationAndWeatherBit = (createAsyncThunk(
  'weatherBit/getLocationAndWeatherBit',
  async (userCoordinates, thunkAPI) => {
    try {
      // const currentWeatherResponse = await fetch(`https://api.weatherbit.io/v2.0/current?lat=${userCoordinates.latitude}&lon=${userCoordinates.longitude}&key=89f9992ac9154f2a9523feb6238e84d0`);
      // const currentWeatherResponseInfo = await currentWeatherResponse.json();
      const weatherResponse = await fetch(`https://api.weatherbit.io/v2.0/forecast/daily?lat=${userCoordinates.latitude}&lon=${userCoordinates.longitude}&key=89f9992ac9154f2a9523feb6238e84d0`);
      const weatherResponseInfo = await weatherResponse.json();
      const userGEO = await fetch(`https://api.opencagedata.com/geocode/v1/json?q=${userCoordinates.latitude},${userCoordinates.longitude}&key=1f61a36fc076407080d7ac7e70c132e8&language=en`);
      const userGEOResponse = await userGEO.json();
      thunkAPI.dispatch(setGEOBit(userGEOResponse));
      thunkAPI.dispatch(setCurrentWeatherBit(weatherResponseInfo));
      thunkAPI.dispatch(setWeather7DaysBit(weatherResponseInfo));
      console.log('asdasd');
      console.log(weatherResponseInfo);
    } catch (err) {
      console.log(err);
    }
  },
));
export default weatherBitSlice.reducer;
