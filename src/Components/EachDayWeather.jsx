import { date, days } from './DateInfo';
import './EachDayWeather.css';
// eslint-disable-next-line react/prop-types
function EachDayWeather({ temperature, serviceLocalStorage, index }) {
  return (
    <div className="EachDayWeather">
      <div>
        {/* eslint-disable-next-line max-len */}
        {days[date.getDay() + index + 1 <= 6 ? date.getDay() + index + 1 : Math.abs(date.getDay() - index)]}
      </div>
      <div className="weather">
        <div>
          {Math.round(temperature)}
          <sup>o</sup>
        </div>
        <div>
          {/* eslint-disable-next-line react/prop-types */}
          <img src={`http://openweathermap.org/img/wn/${serviceLocalStorage?.weather7DaysStorage[index]?.weather[0]?.icon}@2x.png`} alt="didnt load" />
        </div>
      </div>
    </div>
  );
}
export default EachDayWeather;
