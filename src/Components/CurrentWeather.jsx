import { useSelector } from 'react-redux';
import { selectCurrentTemperature, selectCurrentWeather } from '../Redux/Selectors';

function CurrentWeather() {
  const currentWeather = useSelector(selectCurrentWeather);
  const currentTemperature = useSelector(selectCurrentTemperature);
  if (currentTemperature) {
    return (
      <div className="current_weather">
        {currentWeather}
        ,
        {Math.round(currentTemperature)}
        <sup>o</sup>
      </div>

    );
  }
}
export default CurrentWeather;
