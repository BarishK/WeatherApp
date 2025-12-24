import { useEffect, useState } from "react";
import { GiFog } from "react-icons/gi";
import {
  TiWeatherCloudy,
  TiWeatherDownpour,
  TiWeatherSunny,
} from "react-icons/ti";

export function WeatherSummary({ cityName, allData }) {
  // TIME / DATE
  const [day, setDay] = useState("");
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");
  const [hours, setHours] = useState("");
  const [minutes, setMinutes] = useState("");

  useEffect(() => {
    if (!allData?.dt) return;

    // timestamp + timezone offset → JS Date
    const localDate = new Date((allData.dt + allData.timezone) * 1000);

    setDay(localDate.getUTCDate());
    setMonth(localDate.getUTCMonth() + 1); // ay (0-11)
    setYear(localDate.getUTCFullYear());

    setHours(localDate.getUTCHours().toString().padStart(2, "0"));
    setMinutes(localDate.getUTCMinutes().toString().padStart(2, "0"));
  }, [allData?.dt, allData?.timezone]);

  // ICON CHANGER
  const weatherMain = allData?.weather[0].main;
  let icon = "";

  switch (weatherMain) {
    case "Clouds":
      icon = <TiWeatherCloudy />;
      break;
    case "Clear":
      icon = <TiWeatherSunny />;
      break;
    case "Rain":
      icon = <TiWeatherDownpour />;
      break;
    case "Fog":
      icon = <GiFog />;
      break;
  }

  return (
    <div className="weatherSummary d-flex align-center gap-5 p-3">
      <div className="currentCelsius">
        <p className="font-xlarge color-white font-weight-large">
          {Math.floor(allData?.main?.temp)}°
        </p>
      </div>
      <div className="cityAndDate color-white">
        <div className="currentCity">
          <p className="font-medium font-weight-xsmall">{cityName}</p>
        </div>
        <div className="currentDate">
          <p className="font-small">
            {hours}:{minutes} - {day}/{month}/{year}
          </p>
        </div>
      </div>
      <div className="currentIcon font-medium color-white">{icon}</div>
    </div>
  );
}
