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
import { days, months, date } from './DateInfo';
import EachDayWeather from './EachDayWeather';
import CurrentWeather from './CurrentWeather';
import { getLocationAndWeatherBit } from '../Redux/weatherBitSlice';
import EachDayWeatherBit from './EachDayWeatherBit';

function Background() {
  const dispatch = useDispatch();

  const city = useSelector(selectCity);
  const country = useSelector(selectCountry);
  const weather7Days = useSelector(selectWeather7Days);

  const cityWeatherBit = useSelector(selectCityBit);
  const countryWeatherBit = useSelector(selectCountryBit);
  const weather7DaysBit = useSelector(selectWeather7DaysBit);

  const [service, setService] = useState(null);
  const [backgroundWeather, setBackgroundWeather] = useState(null);
  const [backgroundWeatherImageURL, setBackgroundWeatherImageURL] = useState(null);
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
    // eslint-disable-next-line no-unused-expressions
    if (!localStorage.getItem('chosenService')) {
      localStorage.setItem('chosenService', JSON.stringify(options[0]));
      setService(JSON.parse(localStorage.getItem('chosenService')));
    } else if (service === null) {
      setService(JSON.parse(localStorage.getItem('chosenService')));
    } else if (service) {
      localStorage.setItem('chosenService', JSON.stringify(service));
    }
  }, [service]);
  const openWeatherLocalStorage = JSON.parse(localStorage.getItem('openWeather'));
  const weatherBitLocalStorage = JSON.parse(localStorage.getItem('weatherBit'));
  const weatherId = service?.label === 'OpenWeatherMap' ? openWeatherLocalStorage.weather7DaysStorage[0]?.weather[0]?.id : weatherBitLocalStorage?.weather7DaysStorage[0]?.weather?.code;
  // eslint-disable-next-line max-len
  switch (service?.label) {
    case 'OpenWeatherMap':
      // eslint-disable-next-line max-len
      if (openWeatherLocalStorage?.dayStorage !== date.getDay() || openWeatherLocalStorage?.cityStorage === null) {
        getCoordinates();
        localStorage.setItem('openWeather', JSON.stringify(openWeather));
      }
      break;
    case 'WeatherBit':
      // eslint-disable-next-line max-len
      if (weatherBitLocalStorage?.dayStorage !== date.getDay() || weatherBitLocalStorage?.cityStorage === null) {
        getCoordinates();
        localStorage.setItem('weatherBit', JSON.stringify(weatherBit));
      }
      break;
    default:
      console.log('no one of services');
  }
  useEffect(() => {
    if (weatherId >= 200 && weatherId <= 232) {
      setBackgroundWeather('Thunderstorm');
    } else if (weatherId >= 300 && weatherId <= 321) {
      setBackgroundWeather('Drizzle');
    } else if (weatherId >= 500 && weatherId <= 531) {
      setBackgroundWeather('Rain');
    } else if (weatherId >= 600 && weatherId <= 622) {
      setBackgroundWeather('Snow');
    } else if (weatherId === 800) {
      setBackgroundWeather('Clear');
    } else if (weatherId >= 801 && weatherId <= 804) {
      setBackgroundWeather('Clouds');
    }
  }, [weatherId]);
  useEffect(() => {
    switch (backgroundWeather) {
      case 'Thunderstorm':
        setBackgroundWeatherImageURL('/pexels-andre-furtado-1162251.jpg');
        break;
      case 'Drizzle':
        setBackgroundWeatherImageURL('/pexels-kaique-rocha-125510.jpg');
        break;
      case 'Rain':
        setBackgroundWeatherImageURL('/pexels-kaique-rocha-125510.jpg');
        break;
      case 'Snow':
        setBackgroundWeatherImageURL('/pexels-photomix-company-877398.jpg');
        break;
      case 'Clear':
        setBackgroundWeatherImageURL('/pexels-max-andrey-1068989.jpg');
        break;
      case 'Clouds':
        setBackgroundWeatherImageURL('/pexels-lisa-1662145.jpg');
        break;
      default:
        setBackgroundWeatherImageURL('/pexels-max-andrey-1068989.jpg');
    }
  }, [backgroundWeather]);
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
            value={{ label: `${service?.label}`, value: `${service?.value}` }}
            options={options}
            onChange={handleChange}
          />
        </div>
      </div>
      <img alt="unloaded" src={backgroundWeatherImageURL} className="image" />
      <div className="allweather">
        <div className="weather7Days">
          {/* eslint-disable-next-line max-len */}
          <CurrentWeather service={service} openWeatherLocalStorage={openWeatherLocalStorage} serviceLocalStorage={service?.label === 'OpenWeatherMap' ? openWeatherLocalStorage : weatherBitLocalStorage} />
          { service?.label === 'OpenWeatherMap' ? openWeatherLocalStorage?.weather7DaysStorage?.slice(1).map((weekday, index) => (
            <div className="EachDayWeather" key={uuid.v4().slice(0, 5)}>
              <EachDayWeather
                temperature={weekday.temp.day}
                serviceLocalStorage={openWeatherLocalStorage}
                index={index}
              />
            </div>
          )) : weatherBitLocalStorage?.weather7DaysStorage?.slice(1).map((weekday, index) => (
            <div className="EachDayWeather" key={uuid.v4().slice(0, 5)}>
              <EachDayWeatherBit
                temperature={weekday?.temp}
                serviceLocalStorage={weatherBitLocalStorage}
                index={index}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
export default Background;
