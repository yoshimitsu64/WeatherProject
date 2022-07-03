// eslint-disable-next-line react/prop-types
function EachDayWeatherBit({ temperature, serviceLocalStorage, index }) {
  return (
    <div>
      <div>
        {Math.round(temperature)}
        <sup>o</sup>
      </div>
      <div>
        {/* eslint-disable-next-line react/prop-types */}
        <img src={`https://www.weatherbit.io/static/img/icons/${serviceLocalStorage?.weather7DaysStorage[index]?.weather?.icon}.png`} alt="didnt load" />
      </div>
    </div>
  );
}
export default EachDayWeatherBit;
