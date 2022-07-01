// eslint-disable-next-line react/prop-types
function EachDayWeather({ temperature, weather }) {
  return (
    <div>
      <div>
        {Math.round(temperature)}
        <sup>o</sup>
      </div>
      <div>
        {weather}
      </div>
    </div>
  );
}
export default EachDayWeather;
