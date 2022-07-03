// eslint-disable-next-line react/prop-types
function EachDayWeather({ temperature, serviceLocalStorage, index }) {
  return (
    <div>
      <div>
        {Math.round(temperature)}
        <sup>o</sup>
      </div>
      <div>
        {/* eslint-disable-next-line react/prop-types */}
        <img src={`http://openweathermap.org/img/wn/${serviceLocalStorage?.weather7DaysStorage[index]?.weather[0]?.icon}@2x.png`} alt="didnt load" />
      </div>
    </div>
  );
}
export default EachDayWeather;
