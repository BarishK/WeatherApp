import { TbZoom } from "react-icons/tb";
import "./WeatherInfo.css";
import { useState } from "react";

export function WeatherInfo({ getCityData, allData }) {
  const [inputValue, setInputValue] = useState("");

  return (
    <div className="weatherInfo p-2 py-2 pr-5 color-white">
      <div className="locationInput">
        <input
          type="text"
          className="px-5 py-1"
          placeholder="Search Location"
          onChange={(e) => setInputValue(e.target.value)}
        />

        <TbZoom
          className="input-icon"
          onClick={() => getCityData(inputValue)}
        />
      </div>
      <div className="mt-5">
        <p>Weather Blog...</p>
      </div>
      <div className="weatherAllDetails d-flex flex-column gap-5 mt-5">
        <div>
          <p className="weatherCondition font-weight-medium">
            THUNDERSTORM WITH LIGHT DRIZZLE
          </p>
        </div>
        <div className="weatherDetail">
          <p>Temp max</p>
          <p>
            {allData ? Math.floor(allData ? allData.main.temp_max : "") : ""}°
          </p>
        </div>
        <div className="weatherDetail">
          <p>Temp min</p>
          <p>
            {allData ? Math.floor(allData ? allData.main.temp_min : "") : ""}°
          </p>
        </div>
        <div className="weatherDetail">
          <p>Humadity</p>
          <p>{allData?.main.humidity}%</p>
        </div>
        <div className="weatherDetail">
          <p>Cloudy</p>
          <p>{allData?.clouds.all}%</p>
        </div>
        <div className="weatherDetail">
          <p>Wind</p>
          <p>{allData?.wind.speed}km/h</p>
        </div>
      </div>
    </div>
  );
}
