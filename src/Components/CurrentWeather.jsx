import './EachDayWeather.css';
// eslint-disable-next-line react/prop-types
function CurrentWeather({ serviceLocalStorage, service }) {
  // eslint-disable-next-line react/prop-types
  // eslint-disable-next-line react/prop-types,max-len
  if (serviceLocalStorage?.weather7DaysStorage[0]?.temp?.day || serviceLocalStorage?.weather7DaysStorage[0]?.temp) {
    return (
      <div className="current_weather">
        <div>
          Today
        </div>
        <div className="weather">
          <div>
            {/* eslint-disable-next-line react/prop-types */}
            {service?.label === 'OpenWeatherMap' ? Math.round(serviceLocalStorage?.weather7DaysStorage[0]?.temp?.day) : Math.round(serviceLocalStorage?.weather7DaysStorage[0]?.temp)}
            <sup>o</sup>
          </div>
          <div>
            {/* eslint-disable-next-line react/prop-types */}
            <img alt="didnt load" src={service?.label === 'OpenWeatherMap' ? `http://openweathermap.org/img/wn/${serviceLocalStorage?.weather7DaysStorage[0]?.weather[0]?.icon}@2x.png` : `https://www.weatherbit.io/static/img/icons/${serviceLocalStorage?.weather7DaysStorage[0]?.weather?.icon}.png`} />
          </div>
        </div>
      </div>
    );
  }
}
export default CurrentWeather;
