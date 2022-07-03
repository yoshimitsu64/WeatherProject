import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const initialstate = {
  city: null,
  country: null,
  currentWeather: null,
  currentTemperature: null,
  weather7days: null,
};
const openWeatherSlice = createSlice({
  name: 'openWeather',
  initialState: initialstate,
  reducers: {
    setGEO: (state, action) => {
      // eslint-disable-next-line no-param-reassign
      state.city = action.payload.results[0]?.components?.city;
      // eslint-disable-next-line no-param-reassign
      state.country = action.payload.results[0]?.components?.country;
    },
    setCurrentWeather: (state, action) => {
      // eslint-disable-next-line no-param-reassign
      state.currentTemperature = action.payload.daily[0]?.temp?.day;
      // eslint-disable-next-line no-param-reassign
      state.currentWeather = action.payload.daily[0]?.weather[0]?.main;
    },
    setWeather7Days: (state, action) => {
      // eslint-disable-next-line no-param-reassign
      state.weather7days = action.payload.daily.filter((value, index) => index < 7);
    },
  },
});

export const { setGEO, setCurrentWeather, setWeather7Days } = openWeatherSlice.actions;
export default openWeatherSlice.reducer;

export const getLocationAndWeather = (createAsyncThunk(
  'openWeather/getLocationAndWeather',
  async (userCoordinates, thunkAPI) => {
    try {
      console.log('asdasdasdasdad');
      const weatherResponse = await fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${userCoordinates.latitude}&lon=${userCoordinates.longitude}&units=metric&exclude=hourly,minutely&appid=5b62af36294f651a77a9e1f07ccddedf`);
      const weatherResponseInfo = await weatherResponse.json();
      const userGEO = await fetch(`https://api.opencagedata.com/geocode/v1/json?q=${userCoordinates.latitude},${userCoordinates.longitude}&key=1f61a36fc076407080d7ac7e70c132e8&language=en`);
      const userGEOResponse = await userGEO.json();
      console.log(userGEOResponse);
      thunkAPI.dispatch(setGEO(userGEOResponse));
      thunkAPI.dispatch(setCurrentWeather(weatherResponseInfo));
      thunkAPI.dispatch(setWeather7Days(weatherResponseInfo));
      console.log(weatherResponseInfo);
      console.log('asdasdasdasdad');
    } catch (err) {
      console.log(err);
    }
  },
));
