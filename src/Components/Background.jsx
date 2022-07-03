import './Background.css';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// eslint-disable-next-line import/no-extraneous-dependencies
import * as uuid from 'uuid';
import Select from 'react-select';
import { getLocationAndWeather } from '../Redux/weatherSlice';
// import { getLocationAndWeatherBit } from '../Redux/weatherBitSlice';
import {
  selectCity,
  selectCityBit,
  selectCountry,
  selectCountryBit,
  selectWeather7Days, selectWeather7DaysBit,
} from '../Redux/Selectors';
import { days, months } from './DateInfo';
import EachDayWeather from './EachDayWeather';
import CurrentWeather from './CurrentWeather';
import { getLocationAndWeatherBit } from '../Redux/weatherBitSlice';

function Background() {
  const dispatch = useDispatch();

  const city = useSelector(selectCity);
  const country = useSelector(selectCountry);
  const weather7Days = useSelector(selectWeather7Days);

  const cityWeatherBit = useSelector(selectCityBit);
  const countryWeatherBit = useSelector(selectCountryBit);
  const weather7DaysBit = useSelector(selectWeather7DaysBit);
  const date = new Date();
  const [service, setService] = useState(null);
  const openWeather = {
    dayStorage: date.getDay(),
    cityStorage: city,
    countryStorage: country,
    weather7DaysStorage: weather7Days,
  };
  const weatherBit = {
    dayStorage: date.getDay(),
    cityStorage: cityWeatherBit,
    countryStorage: countryWeatherBit,
    weather7DaysStorage: weather7DaysBit,
  };
  console.log(weatherBit);
  const options = [
    { value: 0, label: 'OpenWeatherMap' },
    { value: 1, label: 'WeatherBit' },
  ];

  const handleChange = (e) => {
    setService(options[e.value]);
  };
  function getCoordinates() {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        // eslint-disable-next-line no-unused-expressions
        service.label === 'OpenWeatherMap' ? dispatch(getLocationAndWeather(position.coords)) : dispatch(getLocationAndWeatherBit(position.coords));
      },
    );
  }
  useEffect(() => {
    console.log(service);
    // eslint-disable-next-line no-unused-expressions
    if (localStorage.getItem('chosenService') === 'null') {
      localStorage.setItem('chosenService', JSON.stringify(options[0]));
      setService(JSON.parse(localStorage.getItem('chosenService')));
    } else if (service === null || service === 'null') {
      setService(JSON.parse(localStorage.getItem('chosenService')));
    } else if (service) {
      localStorage.setItem('chosenService', JSON.stringify(service));
    }
  }, [service]);
  console.log(service?.value, service?.label);
  const openWeatherLocalStorage = JSON.parse(localStorage.getItem('openWeather'));
  const weatherBitLocalStorage = JSON.parse(localStorage.getItem('weatherBit'));
  // eslint-disable-next-line max-len
  switch (service?.label) {
    case 'OpenWeatherMap':
      // eslint-disable-next-line max-len
      if (openWeatherLocalStorage?.dayStorage !== date.getDay() || openWeatherLocalStorage?.cityStorage === null) {
        console.log('as');
        getCoordinates();
        localStorage.setItem('openWeather', JSON.stringify(openWeather));
      }
      break;
    case 'WeatherBit':
      // eslint-disable-next-line max-len
      if (weatherBitLocalStorage?.dayStorage !== date.getDay() || weatherBitLocalStorage?.cityStorage === null) {
        console.log('as');
        getCoordinates();
        localStorage.setItem('weatherBit', JSON.stringify(weatherBit));
      }
      break;
    default:
      console.log('no one of services');
  }
  return (
    <div className="Background">
      <div className="Background_location_info">
        <div className="location_time">
          <div>
            {date.getHours()}
            :
            {date.getMinutes()}
          </div>
          <div>
            {days[date.getDay()]}
            ,
            {months[date.getDay()]}
            ,
            {date.getFullYear()}
          </div>
        </div>

        <div className="location">
          <div>
            {openWeatherLocalStorage?.cityStorage}
          </div>
          <div>
            {openWeatherLocalStorage?.countryStorage}
          </div>
          <Select
            value={service?.label ? { label: `${service?.label}`, value: `${service?.value}` } : { label: 'none', value: 'none' }}
            options={options}
            onChange={handleChange}
          />
        </div>
      </div>
      <img alt="unloaded" src="/pexels-bill-white-165537.jpg" className="image" />
      <div className="allweather">
        <div className="weather7Days">
          {/* eslint-disable-next-line max-len */}
          <CurrentWeather service={service} serviceLocalStorage={service?.label === 'OpenWeatherMap' ? openWeatherLocalStorage : weatherBitLocalStorage} />
          { service?.label === 'OpenWeatherMap' ? openWeatherLocalStorage?.weather7DaysStorage?.slice(1).map((weekday) => (
            <div className="EachDayWeather" key={uuid.v4().slice(0, 5)}>
              <EachDayWeather
                temperature={weekday.temp.day}
                weather={weekday.weather[0].main}
              />
            </div>
          )) : weatherBitLocalStorage?.weather7DaysStorage?.slice(1).map((weekday) => (
            <div className="EachDayWeather" key={uuid.v4().slice(0, 5)}>
              <EachDayWeather
                chosenService={service}
                temperature={weekday?.temp}
                weather={weekday?.weather?.description}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
export default Background;
