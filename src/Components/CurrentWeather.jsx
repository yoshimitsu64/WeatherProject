// eslint-disable-next-line react/prop-types
function CurrentWeather({ serviceLocalStorage, service, openWeatherLocalStorage }) {
  // eslint-disable-next-line react/prop-types
  console.log(serviceLocalStorage?.weather7DaysStorage[0]?.temp?.day, service?.label);
  // eslint-disable-next-line react/prop-types,max-len
  if (serviceLocalStorage?.weather7DaysStorage[0]?.temp?.day || serviceLocalStorage?.weather7DaysStorage[0]?.temp) {
    return (
      <div className="current_weather">
        <div>
          {/* eslint-disable-next-line react/prop-types */}
          {service?.label === 'OpenWeatherMap' ? Math.round(serviceLocalStorage?.weather7DaysStorage[0]?.temp?.day) : Math.round(serviceLocalStorage?.weather7DaysStorage[0]?.temp)}
          <sup>o</sup>
        </div>

        <div>
          {/* eslint-disable-next-line react/prop-types */}
          <img alt="didnt load" src={service.label === 'OpenWeatherMap' ? `http://openweathermap.org/img/wn/${openWeatherLocalStorage?.weather7DaysStorage[0]?.weather[0]?.icon}@2x.png` : `https://www.weatherbit.io/static/img/icons/${serviceLocalStorage?.weather7DaysStorage[0]?.weather?.icon}.png`} />
        </div>

      </div>
    );
  }
}
export default CurrentWeather;
