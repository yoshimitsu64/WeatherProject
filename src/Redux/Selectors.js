export const selectCity = (state) => state.openWeather.city;
export const selectCountry = (state) => state.openWeather.country;
export const selectCurrentWeather = (state) => state.openWeather.currentWeather;
export const selectCurrentTemperature = (state) => state.openWeather.currentTemperature;
export const selectWeather7Days = (state) => state.openWeather.weather7days;

export const selectCityBit = (state) => state.weatherBit.city;
export const selectCountryBit = (state) => state.weatherBit.country;
export const selectCurrentWeatherBit = (state) => state.weatherBit.currentWeather;
export const selectCurrentTemperatureBit = (state) => state.weatherBit.currentTemperature;
export const selectWeather7DaysBit = (state) => state.weatherBit.weather7days;
